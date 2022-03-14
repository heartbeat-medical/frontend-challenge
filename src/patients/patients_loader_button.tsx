import { FunctionComponent } from "react";
import { useToast } from "../toast/ToastProvider";
import { Patient } from "./patients";

type props = {
  loadPatients: () => Promise<Patient[]>;
  onLoaded: (ps: Patient[]) => void;
};

export const PatientsLoader: FunctionComponent<props> = ({
  loadPatients,
  onLoaded,
}) => {
  const { addToast } = useToast();

  const makeRequest = () => {
    loadPatients()
      .then((ps) => {
        onLoaded(ps);
        addToast({
          title: "Successfully loaded all patients",
          status: "success",
        });
      })
      .catch((err) =>
        addToast({
          title: "Error loading all patients",
          message: err,
          status: "error",
        })
      );
  };
  return (
    <div>
      <button onClick={makeRequest}>Load all patients</button>
    </div>
  );
};
