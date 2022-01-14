import { FunctionComponent } from "react";
import { Patient } from "./patients";

type props = {
  loadPatients: () => Promise<Patient[]>;
  onLoaded: (ps: Patient[]) => void;
};

export const PatientsLoader: FunctionComponent<props> = ({ loadPatients, onLoaded }) => {
    const makeRequest = () => {
      loadPatients().then(ps => onLoaded(ps)).catch(err => alert(err))
    };
    return (
      <div>
        <button onClick={makeRequest}>Load all patients</button>
      </div>
    );
  };