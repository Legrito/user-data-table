import { useState, memo } from "react";

interface Props {
  amount: number;
  colNum: number;
  onClick: (newValue: number, colNum: number) => void;
  percent: string;
  id: string;
  onMouseEnter: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const RowCell = ({
  amount,
  colNum,
  onClick,
  percent,
  id,
  onMouseEnter,
}: Props) => {
  const [value, setValue] = useState(amount);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setValue(prev => {
      const newValue = prev + 1;
      if (newValue > amount) {
        onClick(newValue, colNum);
      }
      return newValue;
    });
  };

  return (
    <button
      onMouseEnter={onMouseEnter}
      id={id}
      className={`row__cell`}
      data-percentage={percent}
      data-col={colNum}
      value={value}
      type="button"
      onClick={handleClick}
    >
      {value}
    </button>
  );
};

export default RowCell;
