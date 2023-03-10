import { useContext } from "react";
import { AppContext } from "../App";

interface Props {
  onClick: () => void;
}

const AddRowBtn = ({ onClick }: Props) => {
  const context = useContext(AppContext);

  if (context === null || context?.matrix === null) {
    return null;
  }

  const handleClick = () => {
    if (context && context.matrix) {
      const {
        matrix: { rows, cols, amount },
        handleContextUpdate,
      } = context;
      handleContextUpdate(rows + 1, cols, amount);
    }
    onClick();
  };
  return (
    <button type="button" className="button plus" onClick={handleClick}>
      + Add a row
    </button>
  );
};

export default AddRowBtn;
