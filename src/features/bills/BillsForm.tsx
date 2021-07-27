import { useRef } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Bill } from "../../types";
import { fetchActors } from "../actors/actorsSlice";
import { createBill } from "./billsSlice";

const BillsForm: React.FC<Props> = ({ zeroBill }) => {
  const dispatch = useDispatch();
  const fileInput = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [newBill, setNewBill] = useState<Bill>(zeroBill);

  const actors = useSelector((state: RootState) => state.Actors.Actors);
  const actorsStatus = useSelector((state: RootState) => state.Actors.Status);

  useEffect(() => {
    if (actorsStatus === "idle") dispatch(fetchActors());
  }, [actorsStatus, dispatch]);

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
    console.log(e.target.name)
    console.log(e.target.checked)
    setNewBill((state) => ({
      ...state,
      [e.target.name]: e.target.checked,
    }));
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let imagePresent = false;
    const formData = new FormData();
      if (fileInput.current.files?.length) {
        imagePresent = true;
        formData.append("image", fileInput.current.files?.[0]);
      }
      newBill.Date = new Date(newBill.Date).toUTCString()
      const billProps = {
        Bill: newBill,
        Image: formData,
        Present: imagePresent
      }
      dispatch(createBill(billProps));
  };

  return (
    <form onSubmit={submit}>
      <label htmlFor="image">
        Subir foto:
        <input type="file" name="image" ref={fileInput} />
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
        Compañía
        <select
          name="Company"
          onChange={(e) => handleChange(e)}
          value={newBill.Company.Id}
        >
          {actors.map((company, i) => (
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
  );
};

interface Props {
  zeroBill: Bill;
}

export default BillsForm;
