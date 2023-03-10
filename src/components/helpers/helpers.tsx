import uniqid from "uniqid";
import { Cell } from "../TableRow";
import { ITableRow } from "../TableWrap";

export const getArray = (cols: number): Cell[] => {
  return Array.from({ length: cols }, (_, i) => ({
    id: uniqid(),
    amount: Math.floor(Math.random() * 900) + 100,
  }));
};

export const getAllValues = (): number[] => {
  const table = document.getElementById("table__random");
  const cells = table?.querySelectorAll(".row__cell");

  let arr: number[] = [];
  cells?.forEach(el => arr.push(Number(el.innerHTML)));

  return arr;
};

export const findClosestNumbers = (
  arr: number[],
  target: number,
  n: number = 1
): number[] => {
  const sorted = [...arr].sort(
    (a, b) => Math.abs(a - target) - Math.abs(b - target)
  );
  return sorted.slice(0, n + 1);
};

export const getAvarageArr = (cols: number, rows: number): number[] => {
  let arr: number[] = [];
  const table = document.getElementById("table__random");
  const cells = table?.querySelectorAll(".row__cell");

  if (!cells) {
    return [];
  }

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

export const getRows = (rows: number, rowNum?: number): ITableRow[] => {
  return Array.from({ length: rows }, (_, i) => ({
    rowName: `Cell values M = ${rowNum ?? i + 1}`,
    id: uniqid(),
  }));
};
