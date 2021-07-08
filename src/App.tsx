import styled from "styled-components";
import Transactions from "./features/transactions/Transactions";

const Container = styled.div`
  width: 80%;
  margin: auto;
`;

const App = () => (
  <Container>
    <Transactions />
  </Container>
);

export default App;
