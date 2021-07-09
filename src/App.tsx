import styled from "styled-components";
import Transactions from "./features/transactions/Transactions";
import PendingTransactions from "./features/pendingTransactions/PendingTransactions";
import Home from "./features/Home";
import { Switch, BrowserRouter as Router, Route, Link } from "react-router-dom";

const Container = styled.div`
  width: 80%;
  margin: auto;
`;

const App = () => (
  <Router>
    <ul>
      <li>
        <Link to="/">Inicio</Link>
      </li>
      <li>
        <Link to="/transactions">Transacciones</Link>
      </li>
      <li>
        <Link to="/pending_transactions">Transacciones Pendientes</Link>
      </li>
    </ul>
    <Container>
      <Switch>
        <Route path="/transactions">
          <Transactions />
        </Route>
        <Route path="/pending_transactions">
          <PendingTransactions />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Container>
  </Router>
);

export default App;
