import { useState } from "react";
import { useDispatch } from "react-redux";
import { Actor } from "../../types";
import { createActor } from "./actorsSlice";

const ActorsForm: React.FC<Props> = ({ zeroActor }) => {
  const dispatch = useDispatch();

  const [newActor, setNewActor] = useState<Actor>(zeroActor);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const name = e.target.name;
    const value = e.target.value;
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
      <label htmlFor="Type">
        Tipo
        <select
          name="Type"
          onChange={(e) => handleChange(e)}
          value={newActor.Type}
        >
          <option value="personnel">Personal empresarial</option>
          <option value="third">Tercero</option>
          <option value="mine">Mina</option>
          <option value="contractee">Cliente</option>
        </select>
      </label>
      <label htmlFor="Name">
        Nombre
        <input
          type="text"
          name="Name"
          value={newActor.Name}
          onChange={(e) => handleChange(e)}
        />
      </label>
      <label htmlFor="NationalId">
        Cédula o rif
        <input
          type="text"
          name="NationalId"
          value={newActor.NationalId}
          onChange={(e) => handleChange(e)}
        />
      </label>
      <label htmlFor="Address">
        Dirección
        <input
          type="text"
          name="Address"
          value={newActor.Address}
          onChange={(e) => handleChange(e)}
        />
      </label>
      <label htmlFor="Notes">
        Notas
        <textarea
          name="Notes"
          onChange={(e) => handleChange(e)}
          value={newActor.Notes}
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
