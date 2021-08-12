import { useRef } from "react";
import { useDispatch } from "react-redux";
import { Truck } from "../../types";
import { patchTruck } from "./trucksSlice";

const TrucksPatchForm: React.FC<Props> = ({
  zeroTruck,
  editingTruck,
  setEditingTruck,
}) => {
  const dispatch = useDispatch();
  const fileInput = useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setEditingTruck((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const clearForm = () => {
    fileInput.current.value = "";
    setEditingTruck(zeroTruck);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let imagePresent = false;
    const formData = new FormData();
    if (fileInput.current.files?.length) {
      imagePresent = true;
      for (let i = 0; i < fileInput.current.files.length; i++) {
        formData.append("images", fileInput.current.files[i]);
      }
    }
    const truckProps = {
      Truck: editingTruck,
      Image: formData,
      Present: imagePresent,
    };
    dispatch(patchTruck(truckProps));
    clearForm();
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="Name">
        Nombre:
        <input
          type="text"
          name="Name"
          value={editingTruck.Name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="Data">
        Data:
        <textarea name="Data" value={editingTruck.Data} onChange={(e) => handleChange(e)}/>
      </label>
      <label htmlFor="images">
        <input type="file" name="images" ref={fileInput} multiple />
      </label>
      <button type="submit">Actualizar</button>
      <button type="button" onClick={clearForm}>
        Limpiar
      </button>
    </form>
  );
};

interface Props {
  zeroTruck: Truck;
  editingTruck: Truck;
  setEditingTruck: React.Dispatch<React.SetStateAction<Truck>>;
}

export default TrucksPatchForm;
