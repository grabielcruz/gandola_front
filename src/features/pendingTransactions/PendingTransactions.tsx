import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import PendingTransactionsForm from "./PendingTransactionsForm";
import PendingTransactionsPatchForm from "./PendingTransactionsPatchForm";
import { DateFormatter, FormatCurrency, GetDescriptiveTipe } from "../../utils";
import {
  removePendingTransaction,
  setPendingTransactionsError,
  setPendingTransactionsStatus,
} from "./pendingTransactionsSlice";
import { addTransaction } from '../transactions/transactionsSlice'
import {
  deletePendingTransaction,
  fetchPendingTransactions,
} from "./pendingTransactionsSlice";
import { PendingTransaction } from "../../types";
import axios from "axios";

const PendingTransactions = () => {
  const dispatch = useDispatch();
  const [editingPendingTransaction, setEditingPendingTransaction] =
    useState<PendingTransaction>({
      Id: 0,
      Type: "input",
      Amount: 0,
      Description: "",
      Actor: {
        Id: 1,
        Name: ""
      },
      CreatedAt: "",
    });

  const pendingTransactions = useSelector(
    (state: RootState) => state.PendingTransactions.PendingTransactions
  );
  const status = useSelector(
    (state: RootState) => state.PendingTransactions.Status
  );
  const error = useSelector(
    (state: RootState) => state.PendingTransactions.Error
  );

  useEffect(() => {
    if (status === "idle") dispatch(fetchPendingTransactions());
  }, [status, dispatch]);
  
  const executeTransaction = (Id: number) => {
    const executeTransactionAsync = async (Id: number) => {
      try {
        dispatch(setPendingTransactionsStatus("loading"));
        const response = await axios.put(`/pending_transactions/${Id}`);
        dispatch(setPendingTransactionsStatus("succeeded"));
        dispatch(removePendingTransaction(Id));
        dispatch(addTransaction(response.data))
      } catch (error) {
        dispatch(setPendingTransactionsStatus("failed"));
        dispatch(setPendingTransactionsError(error.response.data));
      }
    };
    executeTransactionAsync(Id)
  }

  return (
    <div>
      {error && error}
      {status === "loading" && "loading"}
      <PendingTransactionsForm />
      {editingPendingTransaction.Id !== 0 && (
        <PendingTransactionsPatchForm
          editingPendingTransaction={editingPendingTransaction}
          setEditingPendingTransaction={setEditingPendingTransaction}
        />
      )}
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Fecha</th>
            <th>Tipo</th>
            <th>Monto</th>
            <th>Descripción</th>
            <th>Actor</th>
          </tr>
        </thead>
        <tbody>
          {pendingTransactions.map((transaction, i) => (
            <tr key={i}>
              <td>{transaction.Id}</td>
              <td>{DateFormatter(transaction.CreatedAt)}</td>
              <td>{GetDescriptiveTipe(transaction.Type)}</td>
              <td>{FormatCurrency(transaction.Amount)}</td>
              <td>{transaction.Description}</td>
              <td>{transaction.Actor.Name}</td>
              <td>
                <button
                  type="button"
                  onClick={() => setEditingPendingTransaction(transaction)}
                >
                  Editar
                </button>
                <button
                  type="button"
                  onClick={() =>
                    dispatch(deletePendingTransaction(transaction.Id))
                  }
                >
                  Eliminar
                </button>
                <button
                  type="button"
                  onClick={() => executeTransaction(transaction.Id)}
                >
                  Ejecutar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PendingTransactions;
