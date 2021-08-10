import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { fetchTrucks } from "./trucksSlice";


const Trucks = () => {
  const dispatch = useDispatch()

  const trucks = useSelector((state: RootState) => state.Trucks.Trucks);
  const status = useSelector((state: RootState) => state.Trucks.Status);
  const error = useSelector((state: RootState) => state.Trucks.Error);

  useEffect(() => {
    if (status === "idle") dispatch(fetchTrucks())
  }, [status, dispatch])

  return (
    <div>
      {error && error}
      {status === "loading" && "loading..."}
      {trucks.length > 0 && (
        <div>
          <h1>Trucks</h1>
          {trucks.map((truck, i) => (
            <div key={i}>
              <h3>Truck # {truck.Id}</h3>
              <p>Name: {truck.Name}</p>
              <h3>Data:</h3>
              <pre>{truck.Data}</pre>
              <h3>Photos:</h3>
              {truck.Photos.map((photo, i) => (
                <img key={i} src={photo} alt={photo} />
              ))}
            </div>
          ))}
        </div>
      )}
      {trucks.length === 0 && <h1>No trucks</h1>}
    </div>
  );
};

export default Trucks;
