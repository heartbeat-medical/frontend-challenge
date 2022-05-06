import { FunctionComponent } from "react";
import { useToast } from "../hooks/use_toast";
import { TOAST_TIMEOUT } from "../utils/constant";
import { Patient } from "./patients";

type props = {
  loadPatients: () => Promise<Patient[]>;
  onLoaded: (ps: Patient[]) => void;
};

export const PatientsLoader: FunctionComponent<props> = ({
  loadPatients,
  onLoaded,
}) => {
  const toast = useToast(TOAST_TIMEOUT);
  const makeRequest = () => {
    loadPatients()
      .then((ps) => onLoaded(ps))
      .catch((err) => {
        toast(err,"error");
      });
  };
  return (
    <div>
      <button style={{ margin: "10px 0px" }} onClick={makeRequest} data-testid="load-patient">
        Load all patients
      </button>
    </div>
  );
};
