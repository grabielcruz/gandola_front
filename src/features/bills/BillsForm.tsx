import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Actor, Bill } from "../../types";
import { GetToday } from "../../utils";
import { createBill } from "./billsSlice";

const BillsForm: React.FC<Props> = ({ zeroBill, companies }) => {
  const dispatch = useDispatch();
  const fileInput = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [newBill, setNewBill] = useState<Bill>(zeroBill);

  useEffect(() => {
    const today = GetToday();
    if (companies.length > 0) {
      const companySelect = {
        Id: companies[0].Id,
        Name: companies[0].Name,
        NationalId: companies[0].NationalId,
      };
      setNewBill((state) => ({
        ...state,
        Company: companySelect,
        Date: today,
      }));
    }
  }, [companies]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value = e.target.value;
    const name = e.target.name;
    setNewBill((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewBill((state) => ({
      ...state,
      [e.target.name]: e.target.checked,
    }));
  };

  const clearForm = () => {
    const today = GetToday();
    if (companies.length > 0) {
      const companySelect = {
        Id: companies[0].Id,
        Name: companies[0].Name,
        NationalId: companies[0].NationalId,
      };
      setNewBill({
        ...zeroBill,
        Company: companySelect,
        Date: today,
      });
    } else {
      setNewBill((state) => ({
        ...state,
        Id: 0,
        Code: "",
        Url: "",
        Date: today,
        Charged: false,
      }));
    }
    fileInput.current.value = "";
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let imagePresent = false;
    const formData = new FormData();
    if (fileInput.current.files?.length) {
      imagePresent = true;
      formData.append("image", fileInput.current.files?.[0]);
    }
    const billProps = {
      Bill: newBill,
      Image: formData,
      Present: imagePresent,
    };
    dispatch(createBill(billProps));
    clearForm();
  };

  return (
    <>
      {companies.length === 0 && (
        <p>
          No pueden generarse facturas porque no hay compañías registradas. Vaya
          y registre una compañía primero
        </p>
      )}
      {companies.length > 0 && (
        <form onSubmit={submit}>
          <label htmlFor="image">
            Subir foto:
            <input type="file" name="image" ref={fileInput} />
          </label>
          <label htmlFor="Code">
            Código:
            <input
              type="text"
              name="Code"
              onChange={(e) => handleChange(e)}
              value={newBill.Code}
            />
          </label>
          <label htmlFor="Date">
            Fecha:
            <input
              type="date"
              name="Date"
              onChange={(e) => handleChange(e)}
              value={newBill.Date}
            />
          </label>
          <label htmlFor="Company">
            Compañía:
            <select
              name="Company"
              onChange={(e) => handleChange(e)}
              value={newBill.Company.Id}
            >
              {companies.map((company, i) => (
                <option key={i} value={company.Id}>
                  {company.Name}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="Charged">
            Cobrada:
            <input
              type="checkbox"
              name="Charged"
              checked={newBill.Charged}
              onChange={(e) => handleChangeCheckbox(e)}
            />
          </label>
          <button type="submit">Crear factura</button>
        </form>
      )}
    </>
  );
};

interface Props {
  zeroBill: Bill;
  companies: Actor[];
}

export default BillsForm;
