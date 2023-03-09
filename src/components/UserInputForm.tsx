import { createContext, useContext, useState } from "react";
import { AppContext } from "../App";

export interface IUserInput {
  rows: number;
  cols: number;
}

export const UserInputContext = createContext<IUserInput | null>(null);

const UserInputForm = () => {
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const context = useContext(AppContext);

  const handleClick = () => {
    if (context?.handleContextUpdate && rows > 0 && cols > 0) {
      context.handleContextUpdate(rows, cols);
    }
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
    <form className="user-input__form">
      <label htmlFor="cols">Columns</label>
      <input value={cols} id="cols" onChange={handleChange} />
      <label htmlFor="rows">Rows</label>
      <input value={rows} id="rows" onChange={handleChange} />
      <button type="button" onClick={handleClick}>
        Apply
      </button>
    </form>
  );
};
export default UserInputForm;
