import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import {
  DateFormatter,
  FormatUSDCurrency,
  FormatVESCurrency,
  GetDescriptiveTipe,
} from "../../utils";
import {
  addPendingTransaction,
  setPendingTransactionsError,
} from "../pendingTransactions/pendingTransactionsSlice";
import TransactionsForm from "./TransactionsForm";
import {
  deleteLastTransaction,
  fetchTransactions,
  patchTransaction,
  removeLastTransaction,
  setTransactionsError,
  setTransactionsStatus,
} from "./transactionsSlice";

const TransactionsWithBalances = () => {
  const dispatch = useDispatch();
  const [editingTransaction, setEditingTransaction] = useState<{
    Id: number;
    Description: string;
  }>({
    Id: 0,
    Description: "",
  });

  const transactions = useSelector(
    (state: RootState) => state.Transactions.Transactions
  );
  const status = useSelector((state: RootState) => state.Transactions.Status);
  const error = useSelector((state: RootState) => state.Transactions.Error);

  useEffect(() => {
    if (status === "idle") dispatch(fetchTransactions());
  }, [status, dispatch]);

  const editTransaction = (Id: number, Description: string) => {
    setEditingTransaction({
      Id,
      Description,
    });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEditingTransaction({
      ...editingTransaction,
      Description: e.target.value,
    });
  };

  const submitDescription = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      patchTransaction({
        Id: editingTransaction.Id,
        Description: editingTransaction.Description,
      })
    );
    setEditingTransaction({
      Id: 0,
      Description: "",
    });
  };

  const unexecuteLastTransaction = () => {
    const unexecute = async () => {
      try {
        dispatch(setTransactionsStatus("loading"));
        const response = await axios.put("/transactions");
        dispatch(addPendingTransaction(response.data));
        dispatch(removeLastTransaction(""));
        dispatch(setTransactionsStatus("succeeded"));
        dispatch(setPendingTransactionsError(null));
        dispatch(setTransactionsError(null));
      } catch (error) {
        dispatch(setTransactionsStatus("failed"));
        dispatch(setTransactionsError(error.response.data));
      }
    };
    unexecute();
  };

  return (
    <div>
      {status === "loading" && <p>Cargando...</p>}
      {error && error}
      <TransactionsForm />
      <button type="button" onClick={() => dispatch(deleteLastTransaction())}>
        Borrar última transacción
      </button>
      <button type="button" onClick={() => unexecuteLastTransaction()}>
        Pasar última transacción a pendientes
      </button>
      {editingTransaction.Id !== 0 && (
        <form onSubmit={(e) => submitDescription(e)}>
          <label htmlFor="Description">
            <input
              type="text"
              onChange={(e) => handleDescriptionChange(e)}
              value={editingTransaction.Description}
              name="Description"
            />
          </label>
          <button type="submit">Guardar Descripción</button>
          <button
            type="button"
            onClick={() =>
              setEditingTransaction({
                Id: 0,
                Description: "",
              })
            }
          >
            Cerrar
          </button>
        </form>
      )}
      {transactions.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Fecha</th>
              <th>Tipo</th>
              <th>Moneda</th>
              <th>Monto</th>
              <th>Descripción</th>
              <th>Balance USD</th>
              <th>Balance VES</th>
              <th>Actor</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, i) => (
              <tr key={i}>
                <td>{transaction.Id}</td>
                <td>{DateFormatter(transaction.Executed)}</td>
                <td>{GetDescriptiveTipe(transaction.Type)}</td>
                <td>{transaction.Currency}</td>
                <td>
                  {transaction.Currency === "USD"
                    ? FormatUSDCurrency(transaction.Amount)
                    : FormatVESCurrency(transaction.Amount)}
                </td>
                <td>{transaction.Description}</td>
                <td>{FormatUSDCurrency(transaction.USDBalance)}</td>
                <td>{FormatVESCurrency(transaction.VESBalance)}</td>
                <td>{transaction.Actor.Name}</td>
                <td>
                  <button
                    onClick={() =>
                      editTransaction(transaction.Id, transaction.Description)
                    }
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {transactions.length === 0 && <p>No hay transacciones registradas</p>}
    </div>
  );
};

export default TransactionsWithBalances;
