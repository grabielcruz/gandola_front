import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { deleteActor, fetchActors } from "./actorsSlice";
import ActorsForm from "./ActorsForm";
import ActorsPatchForm from "./ActorsPatchForm";
import { Actor } from "../../types";

const Actors = () => {
  const dispatch = useDispatch();
  const zeroActor: Actor = {
    Id: 0,
    Name: "",
    Description: "",
    IsCompany: false,
    CreatedAt: "",
  };
  const [editingActor, setEditingActor] = useState<Actor>(zeroActor);
  const actors = useSelector((state: RootState) => state.Actors.Actors);
  const status = useSelector((state: RootState) => state.Actors.Status);
  const error = useSelector((state: RootState) => state.Actors.Error);

  useEffect(() => {
    if (status === "idle") dispatch(fetchActors());
  }, [status, dispatch]);

  return (
    <div>
      {error && error}
      {status === "loading" && "loading"}
      <ActorsForm zeroActor={zeroActor} />
      {editingActor.Id !== 0 && (
        <ActorsPatchForm
          editingActor={editingActor}
          setEditingActor={setEditingActor}
          zeroActor={zeroActor}
        />
      )}
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Empresa</th>
          </tr>
        </thead>
        <tbody>
          {actors.map((actor, i) => (
            <tr key={i}>
              <td>{actor.Id}</td>
              <td>{actor.Name}</td>
              <td>{actor.Description}</td>
              <td>{actor.IsCompany ? "Sí" : "No"}</td>
              <td>
                <button type="button" onClick={() => setEditingActor(actor)}>
                  Editar
                </button>
                <button type="button" onClick={() => dispatch(deleteActor(actor.Id))}>Borrar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Actors;
