import styled from "styled-components";
import Transactions from "./features/transactions/Transactions";
import PendingTransactions from "./features/pendingTransactions/PendingTransactions";
import Actors from "./features/actors/Actors";
import Home from "./features/Home";
import { Switch, BrowserRouter as Router, Route, Link } from "react-router-dom";
import Notes from "./features/notes/Notes";

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
      <li>
        <Link to="/actors">Actores</Link>
      </li>
      <li>
        <Link to="/notes">Notas</Link>
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
        <Route path="/actors">
          <Actors />
        </Route>
        <Route path="/notes">
          <Notes />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Container>
  </Router>
);

export default App;
