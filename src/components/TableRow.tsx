import { useEffect, useState, memo, useContext, useRef } from "react";
import { AppContext } from "../App";
import RowCell from "./RowCell";
import { getArray, getAllValues, findClosestNumbers } from "./helpers/helpers";
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
  onDelete: (a: string) => void;
}

const TableRow = memo(
  ({ rowName, rowNum, cols, getValue, id, onDelete }: Props) => {
    const context = useContext(AppContext);
    const [cellValues, setCellValues] = useState(getArray(cols));
    const [rowSum, setRowSum] = useState(
      cellValues.reduce((acc, num) => acc + num.amount, 0)
    );
    const [isSumHovered, setIsSumHovered] = useState(false);
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

    const handleDeleteRow = (e: React.MouseEvent<HTMLButtonElement>) => {
      onDelete(e.currentTarget.value);
    };

    return (
      <tr className="table__row" id={id}>
        <td>
          <span>{rowName}</span>
        </td>
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
        <td className="row__button">
          <button
            className="button minus"
            value={id}
            onClick={handleDeleteRow}
          />
        </td>
      </tr>
    );
  }
);

export default TableRow;
