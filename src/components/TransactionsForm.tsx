import axios from "axios";
import { ChangeEvent, useState } from "react";
import { TransactionWithBalances } from "../types";

const TransactionsForm = () => {
  const [newTransaction, setNewTransaction] = useState<TransactionWithBalances>(
    {
      Id: 0,
      Type: "input",
      Amount: 0,
      Description: "",
      Balance: 0,
      Actor: 1,
      Executed: "",
      CreatedAt: "",
    }
  );

  const createTransaction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(newTransaction);
    try {
      const response = await axios.post("/transactions", newTransaction);
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.name === "Amount") {
      setNewTransaction({
        ...newTransaction,
        Amount: Number(e.target.value) || 0,
      });
      return;
    }
    setNewTransaction({
      ...newTransaction,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={(e) => createTransaction(e)}>
      <label htmlFor="type">
        Tipo
        <select
          name="Type"
          placeholder="Tipo"
          onChange={(e) => handleChange(e)}
          value={newTransaction.Type}
        >
          <option value="output">Salida</option>
          <option value="input">Entrada</option>
        </select>
      </label>

      <label htmlFor="Description">
        Descripción
        <input
          type="text"
          name="Description"
          onChange={(e) => handleChange(e)}
          value={newTransaction.Description}
        />
      </label>

      <label htmlFor="Amount">
        Monto
        <input
          type="number"
          name="Amount"
          onChange={(e) => handleChange(e)}
          value={Number(newTransaction.Amount).toString()}
        />
      </label>

      <label htmlFor="Actor">
        Actor
        <select
          name="Actor"
          onChange={(e) => handleChange(e)}
          value={newTransaction.Actor}
        >
          <option value="1">Externo</option>
        </select>
      </label>
      <button type="submit">Crear transacción</button>
    </form>
  );
};

export default TransactionsForm;
