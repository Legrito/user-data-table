import { createContext, useContext, useState } from "react";

interface UserInput {
  rows: number;
  cols: number;
}

export const UserInputContext = createContext<UserInput>({ rows: 0, cols: 0 });

export const useUserInputContext = () => useContext(UserInputContext);

const UserInputForm = () => {
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [matrix, setMatrix] = useState<UserInput>({ rows: 0, cols: 0 });

  const handleClick = () => {
    setMatrix({ rows, cols });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.id) {
      case "cols":
        return setCols(+e.target.value);
      case "rows":
        return setRows(+e.target.value);
      default:
        return null;
    }
  };

  return (
    <UserInputContext.Provider value={matrix}>
      <form className="user-input__form">
        <label htmlFor="cols">Columns</label>
        <input value={cols} id="cols" onChange={handleChange} />
        <label htmlFor="rows">Rows</label>
        <input value={rows} id="rows" onChange={handleChange} />
        <button type="button" onClick={handleClick}>
          Apply
        </button>
      </form>
    </UserInputContext.Provider>
  );
};
export default UserInputForm;
