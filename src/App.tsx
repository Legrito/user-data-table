import { createContext, useState } from "react";
import Container from "./components/Container";
import UserInputForm from "./components/UserInputForm";
import TableWrap from "./components/TableWrap";

import "./App.css";

export interface IMatrix {
  rows: number;
  cols: number;
}

interface IAppContext {
  matrix: IMatrix | null;
  handleContextUpdate: (a: number, b: number) => void;
}

export const AppContext = createContext<IAppContext | null>(null);

const App = () => {
  const [matrix, setMatrix] = useState<IMatrix | null>(null);

  const handleContextUpdate = (rows: number, cols: number) => {
    setMatrix({ rows, cols });
  };

  return (
    <AppContext.Provider value={{ matrix, handleContextUpdate }}>
      <Container>
        <UserInputForm />
        <TableWrap />
      </Container>
    </AppContext.Provider>
  );
};

export default App;
