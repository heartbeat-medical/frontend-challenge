import { FunctionComponent, useState, useEffect } from "react";
import { Patient, PatientSearchQuery } from "./patients";
import { Loading } from "../loading/loading";
import useToastContext from "../../hooks/useToastContext";

type props = {
  loadPatients: (query: PatientSearchQuery) => Promise<Patient[]>;
  onResults: (ps: Patient[]) => void;
};

export const PatientsSearch: FunctionComponent<props> = ({
  loadPatients,
  onResults,
}) => {
  const [query, updateQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToastContext()

  useEffect(() => {
    const makeRequest = () => {
      setIsLoading(true);
      const sq: PatientSearchQuery = {
        name: query,
        ehrID: query,
        id: query,
      };
      
      loadPatients(sq)
        .then((ps) => {
          onResults(ps);
        })
        .catch((err) => {
          addToast({
            title: "Error Loading Patients",
            message: err,
            status: "error"
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    makeRequest();
  }, [query, loadPatients, onResults, addToast])


  const handleChange = (e: any) => {
    updateQuery(e.target.value);
  }

  return (
    <div>
      {isLoading && <Loading />}
      <input
        onChange={handleChange}
      />
    </div>
  );
};
