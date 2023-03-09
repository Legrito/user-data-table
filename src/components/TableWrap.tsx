import { useContext } from "react";
import TableRow from "./TableRow";
import { AppContext } from "../App";

const TableWrap = () => {
  const context = useContext(AppContext);

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
            <td key={val}>{val}</td>
          ))}
          <th>Sum values</th>
        </tr>
      </thead>
      <tbody>
        {rowsNames.map(val => (
          <TableRow key={val} rowName={val} cols={matrix.cols} />
        ))}
      </tbody>
    </table>
  );
};

export default TableWrap;
