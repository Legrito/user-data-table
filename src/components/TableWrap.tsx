interface Props {
  children: React.ReactNode | null;
}

const TableWrap = ({ children }: Props) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th></th>
          <th>4</th>
          <th>Sum values</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export default TableWrap;
