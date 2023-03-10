import { useState, memo, useEffect } from "react";

interface Props {
  amount: number;
  colNum: number;
  onClick: (newValue: number, colNum: number) => void;
  percent: string;
}

const RowCell = ({ amount, colNum, onClick, percent }: Props) => {
  const [value, setValue] = useState(amount);

  // const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   const newValue = value + 1;
  //   setValue(newValue);
  //   if (newValue > amount) {
  //     onClick(newValue, colNum); // only trigger callback if value increased
  //   }
  // };
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setValue(prev => {
      const newValue = prev + 1;
      if (newValue > amount) {
        onClick(newValue, colNum); // only trigger callback if value increased
      }
      return newValue;
    });
  };

  return (
    <button
      className="row__cell"
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
