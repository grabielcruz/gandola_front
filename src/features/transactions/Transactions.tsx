import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { DateFormatter, FormatCurrency, GetDescriptiveTipe } from "../../utils";
import TransactionsForm from "./TransactionsForm";
import { fetchTransactions } from "./transactionsSlice";

const TransactionsWithBalances = () => {
  const dispatch = useDispatch();

  const transactions = useSelector(
    (state: RootState) => state.transactionsReducer.transactions
  );
  const status = useSelector(
    (state: RootState) => state.transactionsReducer.status
  );
  const error = useSelector((state: RootState) => state.transactionsReducer.error)

  useEffect(() => {
    if (status === "idle") dispatch(fetchTransactions());
  }, [status, dispatch]);

  if (status === "loading") {
    return (
      <div>
        <p>cargando...</p>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div>
        <p>No hay transacciones generadas</p>
      </div>
    );
  }
  return (
    <div>
      {error && error}
      <TransactionsForm />
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Fecha</th>
            <th>Tipo</th>
            <th>Monto</th>
            <th>Descripción</th>
            <th>Balance</th>
            <th>Actor</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, i) => (
            <tr key={i}>
              <td>{transaction.Id}</td>
              <td>{DateFormatter(transaction.Executed)}</td>
              <td>{GetDescriptiveTipe(transaction.Type)}</td>
              <td>{FormatCurrency(transaction.Amount)}</td>
              <td>{transaction.Description}</td>
              <td>{FormatCurrency(transaction.Balance)}</td>
              <td>{transaction.Actor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsWithBalances;
