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
  const [amount, setAmount] = useState(0);
  const context = useContext(AppContext);

  const handleClick = () => {
    if (
      context?.handleContextUpdate &&
      rows > 0 &&
      cols > 0 &&
      amount < rows * cols
    ) {
      context.handleContextUpdate(rows, cols, amount);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.id) {
      case "cols":
        return setCols(+e.target.value);
      case "rows":
        return setRows(+e.target.value);
      case "amount":
        return setAmount(+e.target.value);
      default:
        return null;
    }
  };

  return (
    <form className="user-input__form">
      <fieldset>
        <legend>Number of rows and columns</legend>
        <label htmlFor="cols">Columns</label>
        <input value={cols} id="cols" onChange={handleChange} />
        <label htmlFor="rows">Rows</label>
        <input value={rows} id="rows" onChange={handleChange} />
      </fieldset>
      <fieldset>
        <legend>Number of nearest numbers</legend>
        <input value={amount} id="amount" onChange={handleChange} />
      </fieldset>
      <button className="button" type="button" onClick={handleClick}>
        Apply
      </button>
    </form>
  );
};
export default UserInputForm;
