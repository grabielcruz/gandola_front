import { ChangeEvent, useState, useEffect } from "react";
import { Transaction } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { createTransaction } from "./transactionsSlice";
import { RootState } from "../../app/store";
import { fetchActors } from "../actors/actorsSlice";

const TransactionsForm = () => {
  const dispatch = useDispatch();
  const zeroTransaction: Transaction = {
    Id: 0,
    Type: "input",
    Currency: "USD",
    Amount: 0,
    Description: "",
    USDBalance: 0,
    VESBalance: 0,
    Actor: {
      Id: 1,
      Name: ""
    },
    Executed: "",
    CreatedAt: "",
  };

  const [newTransaction, setNewTransaction] =
    useState<Transaction>(zeroTransaction);

  const actors = useSelector((state: RootState) => state.Actors.Actors);
  const actorsStatus = useSelector((state: RootState) => state.Actors.Status);

  useEffect(() => {
    if (actorsStatus === "idle") dispatch(fetchActors());
  }, [actorsStatus, dispatch]);

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.name === "Amount") {
      setNewTransaction({
        ...newTransaction,
        Amount: Number(e.target.value),
      });
      return;
    }
    if (e.target.name === "Actor") {
      setNewTransaction({
        ...newTransaction,
        Actor: {Id: Number(e.target.value), Name: ""},
      });
      return;
    }
    setNewTransaction({
      ...newTransaction,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createTransaction(newTransaction));
    setNewTransaction(zeroTransaction);
  };

  return (
    <form onSubmit={(e) => submit(e)}>
      <label htmlFor="Type">
        Tipo
        <select
          name="Type"
          placeholder="Tipo"
          onChange={(e) => handleChange(e)}
          value={newTransaction.Type}
        >
          <option value="output">Pago</option>
          <option value="input">Cobro</option>
        </select>
      </label>

      <label htmlFor="Type">
        Moneda
        <select
          name="Currency"
          placeholder="Moneda"
          onChange={(e) => handleChange(e)}
          value={newTransaction.Currency}
        >
          <option value="USD">USD</option>
          <option value="VES">VES</option>
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
          value={newTransaction.Actor.Id}
        >
          {actors.map((actor, i) => (
            <option key={i} value={actor.Id}>
              {actor.Name}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Crear transacción</button>
    </form>
  );
};

export default TransactionsForm;
