import styled from "styled-components";
import TransactionsWithBalances from "./components/transactions/TransactionsWithBalances";

const Container = styled.div`
  width: 80%;
  margin: auto;
`;

const App = () => (
  <Container>
    <TransactionsWithBalances />
  </Container>
);

export default App;
