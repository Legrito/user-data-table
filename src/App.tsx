import { createContext, useState, useRef } from "react";
import Container from "./components/Container";
import UserInputForm from "./components/UserInputForm";
import TableWrap from "./components/TableWrap";

import "./App.css";
import AddRowBtn from "./components/AddRowBtn";

export interface IMatrix {
  rows: number;
  cols: number;
  amount: number;
}

export interface IValues {
  id: string;
  value: number;
}

interface IAppContext {
  matrix: IMatrix | null;
  handleContextUpdate: (a: number, b: number, c: number) => void;
}

export const AppContext = createContext<IAppContext | null>(null);

const App = () => {
  const [matrix, setMatrix] = useState<IMatrix | null>(null);

  const handleContextUpdate = (rows: number, cols: number, amount: number) => {
    if (!rows || !cols || !amount) {
      return;
    }
    setMatrix({ rows, cols, amount });
  };

  return (
    <AppContext.Provider
      value={{
        matrix,
        handleContextUpdate,
      }}
    >
      <Container>
        <UserInputForm />
        <TableWrap />
      </Container>
    </AppContext.Provider>
  );
};

export default App;
