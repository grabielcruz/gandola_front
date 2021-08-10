import { useRef } from "react";
import { Truck } from "../../types";

const TrucksForm: React.FC<Props> = ({ zeroTruck }) => {
  const fileInput = useRef() as React.MutableRefObject<HTMLInputElement>;

  return (
    <form>
      <label htmlFor="Name">
        Nombre:
        <input type="text" name="Name" />
      </label>
      <label htmlFor="Data">
        Data:
        <textarea name="Data" />
      </label>
      <label htmlFor="image">
        <input type="file" name="image" ref={fileInput} />
      </label>
      <button type="submit">Crear camión</button>
    </form>
  );
};

interface Props {
  zeroTruck: Truck;
}

export default TrucksForm;
