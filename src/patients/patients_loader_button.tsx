import { FunctionComponent } from "react";

type props = {
  loadPatients: () => void;
};

export const PatientsLoader: FunctionComponent<props> = ({
  loadPatients,
}) => {
  return (
    <div>
      <button onClick={loadPatients}>Load all patients</button>
    </div>
  );
};
