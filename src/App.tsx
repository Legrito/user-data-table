import Container from "./components/Container";
import UserInputForm from "./components/UserInputForm";
import TableWrap from "./components/TableWrap";

import "./App.css";

const App = () => {
  return (
    <Container>
      <UserInputForm />
      <TableWrap>table</TableWrap>
    </Container>
  );
};

export default App;
