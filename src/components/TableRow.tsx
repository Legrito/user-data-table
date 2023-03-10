import { createContext, useEffect, useState, memo, useCallback } from "react";
import RowCell from "./RowCell";
import uniqid from "uniqid";

type CellId = string; // unique value for all table
type CellValue = number; // three digit random number

export type Cell = {
  id: CellId;
  amount: CellValue;
};

interface Props {
  rowName: string;
  rowNum: number;
  cols: number;
  getValue: (a: Cell[]) => void;
  id: string;
}

const getArray = (cols: number): Cell[] => {
  return Array.from({ length: cols }, (_, i) => ({
    id: uniqid(),
    amount: Math.floor(Math.random() * 900) + 100,
  }));
};

const TableRow = memo(({ rowName, rowNum, cols, getValue, id }: Props) => {
  const [cellValues, setCellValues] = useState(getArray(cols));
  const [rowSum, setRowSum] = useState(
    cellValues.reduce((acc, num) => acc + num.amount, 0)
  );
  const [isSumHovered, setIsSumHovered] = useState(false);

  useEffect(() => {
    const newSum = cellValues.reduce((acc, num) => acc + num.amount, 0);
    setRowSum(newSum);
  }, [cellValues]);

  if (cols === 0) {
    return null;
  }

  const handleValueChange = (newValue: number, colNum: number) => {
    const newCellValues = cellValues.map((cell, index) => {
      if (index === colNum - 1) {
        return { ...cell, amount: newValue };
      } else {
        return cell;
      }
    });
    setCellValues(newCellValues);
    getValue(cellValues);
  };

  const handleHoverSum = () => {
    setIsSumHovered(true);
  };
  const handleLeave = () => {
    setIsSumHovered(false);
  };

  return (
    <tr className={`table__row`}>
      <td>{rowName}</td>
      {cellValues.map((val, id) => (
        <td id={`${val.id}`} key={uniqid()}>
          <RowCell
            colNum={id + 1}
            amount={val.amount}
            onClick={handleValueChange}
            percent={
              isSumHovered
                ? `-->${((val.amount / rowSum) * 100).toFixed(2)}%`
                : ""
            }
          />
        </td>
      ))}
      <td onMouseOver={handleHoverSum} onMouseLeave={handleLeave}>
        {rowSum}
      </td>
    </tr>
  );
});

export default TableRow;
