import axios from "axios";
import React, { useState, useEffect } from "react";
import { TransactionWithBalances } from "../../types";
import { DateFormatter, FormatCurrency, GetDescriptiveTipe } from "../../utils";
import TransactionsForm from "../TransactionsForm";

const TransactionsWithBalances = () => {
  const [transactionsWithBalances, setTransactionsWithBalances] = useState<
    TransactionWithBalances[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getTransactionsWithBalances = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/transactions`);
      setTransactionsWithBalances(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    getTransactionsWithBalances();
  }, []);

  if (loading) {
    return (
      <div>
        <p>cargando...</p>
      </div>
    );
  }

  if (transactionsWithBalances.length === 0) {
    return (
      <div>
        <p>No hay transacciones generadas</p>
      </div>
    );
  }
  return (
    <div>
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
          {transactionsWithBalances.map((transaction, i) => (
            <tr key={i}>
              <td>{transaction.Id}</td>
              <td>{DateFormatter(transaction.Executed)}</td>
              <td>{GetDescriptiveTipe(transaction.Type)}</td>
              {/* <td>{FormatCurrency(transaction.Amount)}</td> */}
              <td>{transaction.Amount}</td>
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
