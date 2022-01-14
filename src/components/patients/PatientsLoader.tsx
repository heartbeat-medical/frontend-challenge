import { FunctionComponent } from "react";
import { Button } from "react-bootstrap";
import { Patient } from "../../models/PatientModel";

type props = {
  loadPatients: () => Promise<Patient[]>;
  onLoaded: (ps: Patient[]) => void;
  setLoading: (loader: boolean) => void;
  disabled: boolean;
};

export const PatientsLoader: FunctionComponent<props> = ({
  loadPatients,
  onLoaded,
  setLoading,
  disabled,
}) => {
  const makeRequest = () => {
    setLoading(true);
    loadPatients()
      .then((ps) => onLoaded(ps))
      .catch((err) => alert(err))
      .finally(()=> setLoading(false));
  };
  return (
    <>
      <Button variant="primary" size="sm" disabled={disabled} onClick={makeRequest}>Load all patients</Button>
    </>
  );
};
