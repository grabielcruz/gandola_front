import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { DateFormatter, FormatCurrency, GetDescriptiveTipe } from "../../utils";
import TransactionsForm from "./TransactionsForm";
import {
  deleteLastTransaction,
  fetchTransactions,
  patchTransaction,
} from "./transactionsSlice";

const TransactionsWithBalances = () => {
  const dispatch = useDispatch();
  const [editingTransaction, setEditingTransaction] = useState<{
    editing: boolean;
    id: number;
    description: string;
  }>({
    editing: false,
    id: 0,
    description: "",
  });

  const transactions = useSelector(
    (state: RootState) => state.transactionsReducer.transactions
  );
  const status = useSelector(
    (state: RootState) => state.transactionsReducer.status
  );
  const error = useSelector(
    (state: RootState) => state.transactionsReducer.error
  );

  useEffect(() => {
    if (status === "idle") dispatch(fetchTransactions());
  }, [status, dispatch]);

  const editTransaction = (id: number) => {
    setEditingTransaction({
      ...editingTransaction,
      editing: true,
      id,
    });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEditingTransaction({
      ...editingTransaction,
      description: e.target.value,
    });
  };

  const submitDescription = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      patchTransaction({
        Id: editingTransaction.id,
        Description: editingTransaction.description,
      })
    );
    setEditingTransaction({
      id: 0,
      editing: false,
      description: "",
    });
  };

  if (transactions.length === 0) {
    return (
      <div>
        <p>No hay transacciones generadas</p>
      </div>
    );
  }
  return (
    <div>
      {status === "loading" && <p>Cargando...</p>}
      {error && error}
      <TransactionsForm />
      <button type="button" onClick={() => dispatch(deleteLastTransaction())}>
        Borrar última transacción
      </button>
      {editingTransaction.editing && (
        <form onSubmit={(e) => submitDescription(e)}>
          <label htmlFor="Description">
            <input
              type="text"
              onChange={(e) => handleDescriptionChange(e)}
              value={editingTransaction.description}
              name="Description"
            />
          </label>
          <button type="submit">Guardar Descripción</button>
        </form>
      )}
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
              <td>
                <button onClick={() => editTransaction(transaction.Id)}>
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsWithBalances;
