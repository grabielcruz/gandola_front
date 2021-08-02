import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Bill } from "../../types";
import { fetchCompanies } from "../actors/actorsSlice";
import BillsForm from "./BillsForm";
import BillsPatchForm from "./BillsPatchForm";
import { deleteBill, fetchBills } from "./billsSlice";

const Bills = () => {
  const dispatch = useDispatch();

  const zeroBill: Bill = {
    Id: 0,
    Code: "",
    Url: "",
    Date: "",
    Company: {
      Id: 0,
      Name: "",
      NationalId: "",
    },
    Charged: false,
    CreatedAt: "",
  };

  const [editingBill, setEditingBill] = useState<Bill>(zeroBill);

  const bills = useSelector((state: RootState) => state.Bills.Bills);
  const status = useSelector((state: RootState) => state.Bills.Status);
  const error = useSelector((state: RootState) => state.Bills.Error);

  const companies = useSelector((state: RootState) => state.Actors.Companies);
  const companiesStatus = useSelector(
    (state: RootState) => state.Actors.CompaniesStatus
  );
  const companiesError = useSelector(
    (state: RootState) => state.Actors.CompaniesError
  );

  useEffect(() => {
    if (companiesStatus === "idle") dispatch(fetchCompanies());
    if (status === "idle") dispatch(fetchBills());
  }, [status, companiesStatus, dispatch]);

  return (
    <div>
      {companiesError && companiesError}
      {error && error}
      {status === "loading" && "loading data..."}
      <BillsForm zeroBill={zeroBill} companies={companies} />
      {editingBill.Id > 0 && (
        <BillsPatchForm
          companies={companies}
          editingBill={editingBill}
          setEditingBill={setEditingBill}
          zeroBill={zeroBill}
        />
      )}
      {bills.length > 0 &&
        bills.map((bill) => (
          <div key={bill.Id}>
            <p>
              <b>Id</b>: {bill.Id}
            </p>
            <p>
              <b>Código</b>: {bill.Code}
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
            <button type="button" onClick={() => setEditingBill(bill)}>
              Editar
            </button>
            <button
              type="button"
              onClick={(e) => dispatch(deleteBill(bill.Id))}
            >
              Borrar
            </button>
          </div>
        ))}
    </div>
  );
};

export default Bills;
