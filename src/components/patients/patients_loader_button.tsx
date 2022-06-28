import { FunctionComponent, useState } from "react";
import { Patient } from "./patients";
import { Loading } from "../loading/loading";
import useToastContext from "../../hooks/useToastContext";

type props = {
  loadPatients: () => Promise<Patient[]>;
  onLoaded: (ps: Patient[]) => void;
};

export const PatientsLoader: FunctionComponent<props> = ({
  loadPatients,
  onLoaded,
}) => {
  const [isLoading, setLoading] = useState(false);
  const { addToast } = useToastContext()

  const makeRequest = () => {
    setLoading(true);
    loadPatients()
      .then((ps)=>{
        onLoaded(ps);
        addToast({
          title: "Patients Loaded Successfuly",
          status: "success"
        })
      })
      .catch((err) => {
        addToast({
          title: "Error Loading Patients",
          message: err,
          status: "error"
        });
      })
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
