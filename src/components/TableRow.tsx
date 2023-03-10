import { useEffect, useState, memo, useMemo, useContext, useRef } from "react";
import { AppContext, IValues } from "../App";
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

const getAllValues = (): number[] => {
  const table = document.getElementById("table__random");
  const cells = table?.querySelectorAll(".row__cell");

  let arr: number[] = [];
  cells?.forEach(el => arr.push(Number(el.innerHTML)));

  return arr;
};

const TableRow = ({ rowName, rowNum, cols, getValue, id }: Props) => {
  const context = useContext(AppContext);
  const [cellValues, setCellValues] = useState(getArray(cols));
  const [rowSum, setRowSum] = useState(
    cellValues.reduce((acc, num) => acc + num.amount, 0)
  );
  const [isSumHovered, setIsSumHovered] = useState(false);
  // const [closest, setClosest] = useState<number[]>([]);
  let closest = useRef<number[]>([]);
  let allVals = useRef<number[]>([]);

  useEffect(() => {
    const newSum = cellValues.reduce((acc, num) => acc + num.amount, 0);

    setRowSum(newSum);

    allVals.current = [...getAllValues()];
  }, [cellValues]);

  if (cols === 0) {
    return null;
  }

  const findClosestNumbers = (
    arr: number[],
    target: number,
    n: number = 1
  ): number[] => {
    const sorted = [...arr].sort(
      (a, b) => Math.abs(a - target) - Math.abs(b - target)
    );
    return sorted.slice(0, n + 1);
  };

  const handleNearest = (e: React.MouseEvent<HTMLButtonElement>) => {
    let targetValue = (e.target as HTMLButtonElement).value;
    const closest: number[] = findClosestNumbers(
      allVals.current,
      +targetValue,
      context?.matrix?.amount
    );
    console.log(targetValue, closest);
    const table = document.getElementById("table__random");
    const cells = table?.querySelectorAll(".row__cell");
    cells?.forEach(el => {
      if (closest.includes(+el.innerHTML)) {
        el.classList.add("nearest");
      }
    });
  };

  const handleClearNearest = () => {
    closest.current = [];
    const table = document.getElementById("table__random");
    const cells = table?.querySelectorAll(".row__cell");
    cells?.forEach(el => {
      if (el.classList.contains("nearest")) {
        el.classList.remove("nearest");
      }
    });
  };

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

  // const handleGetClosest = () => {
  //   return findClosestNumbers(allVals.current, context?.matrix?.amount);
  // };

  return (
    <tr className={`table__row`}>
      <td>{rowName}</td>
      {cellValues.map((val, idx) => {
        const id = uniqid();
        return (
          <td key={id} onMouseOut={handleClearNearest}>
            <RowCell
              id={id}
              colNum={idx + 1}
              amount={val.amount}
              onMouseEnter={handleNearest}
              onClick={handleValueChange}
              percent={
                isSumHovered
                  ? `-->${((val.amount / rowSum) * 100).toFixed(2)}%`
                  : ""
              }
            />
          </td>
        );
      })}
      <td onMouseOver={handleHoverSum} onMouseLeave={handleLeave}>
        {rowSum}
      </td>
    </tr>
  );
};

export default TableRow;
