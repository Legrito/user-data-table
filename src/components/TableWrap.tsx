import { useContext, useEffect, useState } from "react";
import uniqid from "uniqid";
import TableRow from "./TableRow";
import { AppContext } from "../App";
import AddRowBtn from "./AddRowBtn";
import { getAvarageArr, getRows } from "./helpers/helpers";

export interface ITableRow {
  rowName: string;
  id: string;
}

const TableWrap = () => {
  const context = useContext(AppContext);
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
    if (context && context.matrix) {
      const {
        matrix: { rows, cols, amount },
        handleContextUpdate,
      } = context;

      handleContextUpdate(rows - 1, cols, amount);
    }
    setTabRows(prevRows => prevRows.filter(el => el.id !== deletedId));
  };

  const getAllValues = (value: number[]) => {
    setAvarageVal(value);
  };

  return (
    <div className="table__container">
      <table className="table" id="table__random">
        <thead>
          <tr>
            <th></th>
            {colsNames.map(val => (
              <th key={uniqid()}>
                <span>{val}</span>
              </th>
            ))}
            <th>
              <span>Sum values</span>
            </th>
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
                getValue={getAllValues}
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
    </div>
  );
};

export default TableWrap;
