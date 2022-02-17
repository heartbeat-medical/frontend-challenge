import { FunctionComponent } from "react";
import { Patient } from "./patients";

type props = {
  loadPatients: () => Promise<Patient[]>;
  onLoaded: (ps: Patient[]) => void;
  setLoading: (ps: boolean) => void;
  setError: (ps: boolean) => void;
  setErrorMessage: (ps: string) => void;
};

export const PatientsLoader: FunctionComponent<props> = ({
  loadPatients,
  onLoaded,
  setLoading,
  setError,
  setErrorMessage
}) => {
  const makeRequest = () => {
    setLoading(true);
    loadPatients()
      .then((ps) => onLoaded(ps))
      .catch((err) => {setError(true); setErrorMessage(err);}).finally(() => {
        setLoading(false);
      });
  };
  return (
    <div>
      <button onClick={makeRequest}>Load all patients</button>
    </div>
  );
};
