import { FunctionComponent } from "react";
import { Button } from "react-bootstrap";
import { Patient } from "../../models/PatientModel";
import { IToast } from "../../models/ToastModel";

type props = {
  loadPatients: () => Promise<Patient[]>;
  onLoaded: (ps: Patient[]) => void;
  setLoading: (loader: boolean) => void;
  setToast: (toast: IToast) => void;
  disabled: boolean;
};

export const PatientsLoader: FunctionComponent<props> = ({
  loadPatients,
  onLoaded,
  setLoading,
  setToast,
  disabled,
}) => {
  const makeRequest = () => {
    setLoading(true);
    loadPatients()
      .then((ps) => onLoaded(ps))
      .catch((err) => {
        setToast({
          title: 'Error!!!',
          message: err,
          status: 'danger'
        });
      })
      .finally(()=> setLoading(false));
  };
  return (
    <>
      <Button variant="primary" size="sm" disabled={disabled} onClick={makeRequest}>Load all patients</Button>
    </>
  );
};
