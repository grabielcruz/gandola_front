import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Bill } from "../../types";
import BillsForm from "./BillsForm";
import { fetchBills } from "./billsSlice";

const Bills = () => {
  const dispatch = useDispatch();
  const zeroBill: Bill = {
    Id: 0,
    Url: "",
    Date: "",
    Company: {
      Id: 1,
      Name: "",
      NationalId: "",
    },
    Charged: false,
    CreatedAt: ""
  }

  const bills = useSelector((state: RootState) => state.Bills.Bills);
  const status = useSelector((state: RootState) => state.Bills.Status);
  const error = useSelector((state: RootState) => state.Bills.Error);

  useEffect(() => {
    if (status === "idle") dispatch(fetchBills());
  }, [status, dispatch]);

  return (
    <div>
      {error && error}
      {status === "loading" && "loading data..."}
      <BillsForm zeroBill={zeroBill}/>
      {bills.length > 0 &&
        bills.map((bill) => (
          <div key={bill.Id}>
            <p>
              <b>Id</b>: {bill.Id}
            </p>
            <img src={bill.Url} alt="imagen de factura" />
            <p>
              <b>Fecha</b>: {bill.Date}
            </p>
            <p>
              <b>Compañia</b>: {bill.Company.Name}, {bill.Company.NationalId}
            </p>
            <p>
              <b>Cobrada</b>: {bill.Charged ? "Sí" : "No"}
            </p>
          </div>
        ))}
    </div>
  );
};

export default Bills;
