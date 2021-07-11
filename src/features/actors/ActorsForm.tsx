import { useState } from "react";
import { useDispatch } from "react-redux";
import { Actor } from "../../types";
import { createActor } from "./actorsSlice";

const ActorsForm: React.FC<Props> = ({ zeroActor }) => {
  const dispatch = useDispatch();

  const [newActor, setNewActor] = useState<Actor>(zeroActor);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setNewActor({
      ...newActor,
      [name]: value,
    });
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createActor(newActor));
    setNewActor(zeroActor);
  };

  return (
    <form onSubmit={(e) => submit(e)}>
      <label htmlFor="Name">
        Nombre
        <input
          type="text"
          name="Name"
          value={newActor.Name}
          onChange={(e) => handleChange(e)}
        />
      </label>
      <label htmlFor="Description">
        Descripción
        <input
          type="text"
          name="Description"
          value={newActor.Description}
          onChange={(e) => handleChange(e)}
        />
      </label>
      <label htmlFor="IsCompany">
        Empresa
        <input
          type="checkbox"
          name="IsCompany"
          checked={newActor.IsCompany}
          onChange={(e) => handleChange(e)}
        />
      </label>
      <button>Crear actor</button>
    </form>
  );
};

export default ActorsForm;

interface Props {
  zeroActor: Actor;
}
