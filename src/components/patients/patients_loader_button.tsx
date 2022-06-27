import { FunctionComponent, useState } from "react";
import { Patient } from "./patients";
import { Loading } from "../loading/loading";

type props = {
  loadPatients: () => Promise<Patient[]>;
  onLoaded: (ps: Patient[]) => void;
};

export const PatientsLoader: FunctionComponent<props> = ({
  loadPatients,
  onLoaded,
}) => {
  const [isLoading, setLoading] = useState(false);

  const makeRequest = () => {
    setLoading(true);
    loadPatients()
      .then((ps) => onLoaded(ps))
      .catch((err) => alert(err))
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div>
      {isLoading && <Loading />}
      <button onClick={makeRequest}>Load all patients</button>
    </div>
  );
};
