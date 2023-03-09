type CellId = number; // unique value for all table
type CellValue = number; // three digit random number

type Cell = {
  id: CellId;
  amount: CellValue;
};

interface Props {
  rowName: string;
  cols: number;
}

const TableRow = ({ rowName, cols }: Props) => {
  if (cols === 0) {
    return null;
  }
  // let cols = 4;
  let cellValues: Cell[] = Array.from({ length: cols }, (_, i) => ({
    id: i,
    amount: Math.floor(Math.random() * 900) + 100,
  }));

  return (
    <tr>
      <td>{rowName}</td>
      {cellValues.map(val => (
        <td id={`${val.id}`} key={val.amount}>
          {val.amount}
        </td>
      ))}
      <th>Sum values</th>
    </tr>
  );
};

export default TableRow;
