import { useRef } from "react";
import { useDispatch } from "react-redux";
import { Actor, Bill } from "../../types";
import { patchBill } from "./billsSlice";

const BillsPatchForm: React.FC<Props> = ({
  companies,
  editingBill,
  setEditingBill,
  zeroBill,
}) => {
  const dispatch = useDispatch();
  const fileInput = useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setEditingBill((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const hanldeChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingBill((state) => ({
      ...state,
      [e.target.name]: e.target.checked,
    }));
  };

  const clearForm = () => {
    fileInput.current.value = "";
    setEditingBill(zeroBill);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let imagePresent = false;
    const formData = new FormData();
    if (fileInput.current.files?.length) {
      imagePresent = true;
      formData.append("image", fileInput.current.files?.[0]);
    }
    const billProps = {
      Bill: editingBill,
      Image: formData,
      Present: imagePresent,
    };
    dispatch(patchBill(billProps));
    clearForm();
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="image">
        Subir foto:
        <input type="file" name="image" ref={fileInput} />
      </label>
      <label htmlFor="Code">
        Código:
        <input
          type="text"
          name="Code"
          value={editingBill.Code}
          onChange={(e) => handleChange(e)}
        />
      </label>
      <label htmlFor="Date">
        Fecha:
        <input
          type="date"
          name="Date"
          value={editingBill.Date}
          onChange={(e) => handleChange(e)}
        />
      </label>
      <label htmlFor="Company">
        Compañía:
        <select
          name="Company"
          value={editingBill.Company.Id}
          onChange={(e) => handleChange(e)}
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
          checked={editingBill.Charged}
          onChange={(e) => hanldeChangeCheckbox(e)}
        />
      </label>
      <button type="submit">Actualizar factura</button>
      <button type="button" onClick={clearForm}>
        Limpiar
      </button>
    </form>
  );
};

interface Props {
  companies: Actor[];
  editingBill: Bill;
  setEditingBill: React.Dispatch<React.SetStateAction<Bill>>;
  zeroBill: Bill;
}

export default BillsPatchForm;
