import {
  useCallback,
  useContext,
  useEffect,
  useState,
  memo,
  useRef,
  MutableRefObject,
} from "react";
import TableRow from "./TableRow";
import { AppContext } from "../App";
import { Cell } from "./TableRow";
import uniqid from "uniqid";
import AddRowBtn from "./AddRowBtn";

interface ITableRow {
  rowName: string;
  id: string;
}

const getAvarageArr = (cols: number, rows: number): number[] => {
  let arr: number[] = [];
  let cells = document.querySelectorAll(`.table__row > td > button`);

  for (let i = 1; i <= cols; i++) {
    let sum = 0;
    cells.forEach(el => {
      if (Number(el.getAttribute("data-col")) === i) {
        sum += Number(el.getAttribute("value"));
      }
    });
    arr.push(Number((sum / rows).toFixed(2)));
  }

  return arr;
};

const getRows = (rows: number, rowNum?: number): ITableRow[] => {
  return Array.from({ length: rows }, (_, i) => ({
    rowName: `Cell values M = ${rowNum ?? i + 1}`,
    id: uniqid(),
  }));
};

const TableWrap = () => {
  const context = useContext(AppContext);
  // const [cellsValue, setCellsValue] = useState<(Cell | Cell[])[]>([]);
  const cellsValue = useRef<Cell[][]>([]);
  const [avarageVal, setAvarageVal] = useState<number[]>([]);
  const [tabRows, setTabRows] = useState<ITableRow[]>([]);

  useEffect(() => {
    if (context === null || context?.matrix === null) {
      return;
    }

    const {
      matrix: { rows, cols },
    } = context;

    setTabRows(getRows(rows));
    setAvarageVal(getAvarageArr(cols, rows));
  }, [context]);

  const handleSetCellValue = (value: Cell[]) => {
    cellsValue.current = [...cellsValue.current, value];
  };

  if (context === null || context?.matrix === null) {
    return null;
  }

  const { matrix } = context;

  let colsNames: string[] = Array.from(
    { length: matrix.cols },
    (_, i) => `Cell values N = ${i + 1}`
  );

  const handleAddRow = () => {
    const newRow = getRows(1, tabRows.length + 1);
    setTabRows(prewState => prewState.concat(newRow));
  };

  const handleDelete = (deletedId: string) => {
    // if (context && context.matrix) {
    //   const {
    //     matrix: { rows, cols, amount },
    //     handleContextUpdate,
    //   } = context;

    //   handleContextUpdate(rows - 1, cols, amount);
    // }
    setTabRows(prevRows => prevRows.filter(el => el.id !== deletedId));
  };

  return (
    <>
      <table className="table" id="table__random">
        <thead>
          <tr>
            <th></th>
            {colsNames.map(val => (
              <td key={uniqid()}>{val}</td>
            ))}
            <th>Sum values</th>
            <th className="remove__column"></th>
          </tr>
        </thead>
        <tbody id="tbody">
          {tabRows.map((val, idx) => {
            return (
              <TableRow
                key={val.id}
                id={val.id}
                rowName={val.rowName}
                rowNum={idx + 1}
                cols={matrix.cols}
                getValue={handleSetCellValue}
                onDelete={handleDelete}
              />
            );
          })}
          <tr>
            <td>Average values</td>
            {avarageVal.map((val, id) => (
              <td id={uniqid()} key={uniqid()}>
                {val}
              </td>
            ))}
            <td></td>
          </tr>
        </tbody>
      </table>
      <AddRowBtn onClick={handleAddRow} />
    </>
  );
};

export default TableWrap;
