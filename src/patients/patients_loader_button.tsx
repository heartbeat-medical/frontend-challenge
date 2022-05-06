import { FunctionComponent } from "react";
import { useToast } from "../toast/ToastProvider";
import { usePatientsProvider } from "./PatientsProvider";

export const PatientsLoader: FunctionComponent = () => {
  const { addToast } = useToast();
  const { patientsApi, updatePatients } = usePatientsProvider();

  const makeRequest = () => {
    patientsApi
      .All()
      .then((ps) => {
        updatePatients(ps);
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
