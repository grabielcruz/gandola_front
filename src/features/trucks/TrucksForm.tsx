import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Truck } from "../../types";
import { createTruck } from "./trucksSlice";

const TrucksForm: React.FC<Props> = ({ zeroTruck }) => {
  const fileInput = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [newTruck, setNewTruck] = useState<Truck>(zeroTruck);
  const dispatch = useDispatch();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    const name = e.target.name;
    setNewTruck((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const clearForm = () => {
    setNewTruck(zeroTruck);
    fileInput.current.value = "";
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
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
      Truck: newTruck,
      Image: formData,
      Present: imagePresent,
    };
    dispatch(createTruck(truckProps))
    clearForm();
  };

  return (
    <form onSubmit={submit}>
      <label htmlFor="Name">
        Nombre:
        <input
          type="text"
          name="Name"
          onChange={handleChange}
          value={newTruck.Name}
        />
      </label>
      <label htmlFor="Data">
        Data:
        <textarea name="Data" onChange={handleChange} value={newTruck.Data} />
      </label>
      <label htmlFor="images">
        <input type="file" name="images" ref={fileInput} multiple/>
      </label>
      <button type="submit">Crear camión</button>
      <button type="button" onClick={clearForm}>Limpiar</button>
    </form>
  );
};

interface Props {
  zeroTruck: Truck;
}

export default TrucksForm;
