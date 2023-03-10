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

const TableWrap = () => {
  const context = useContext(AppContext);
  // const [cellsValue, setCellsValue] = useState<(Cell | Cell[])[]>([]);
  const cellsValue = useRef<Cell[][]>([]);
  const [avarageVal, setAvarageVal] = useState<number[]>([]);

  useEffect(() => {
    if (context === null || context?.matrix === null) {
      return;
    }

    const {
      matrix: { rows, cols },
    } = context;

    setAvarageVal(getAvarageArr(cols, rows));
  }, [context]);

  useEffect(() => {
    console.log(cellsValue.current);
  });

  // const handleSetCellValue = (value: Cell[]) => {
  //   setCellsValue(prevState => {
  //     return [...prevState, value];
  //   });
  // };
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
  let rowsNames: string[] = Array.from(
    { length: matrix.rows },
    (_, i) => `Cell values M = ${i + 1}`
  );

  return (
    <table className="table">
      <thead>
        <tr>
          <th></th>
          {colsNames.map(val => (
            <td key={uniqid()}>{val}</td>
          ))}
          <th>Sum values</th>
        </tr>
      </thead>
      <tbody>
        {rowsNames.map((val, idx) => {
          const id = uniqid();
          return (
            <TableRow
              key={id}
              id={id}
              rowName={val}
              rowNum={idx + 1}
              cols={matrix.cols}
              getValue={handleSetCellValue}
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
  );
};

export default TableWrap;
