import { FunctionComponent, useState } from "react";
import { Patient, PatientSearchQuery } from "./patients";
import Loader from "../loader/loader";
import { ToastBox } from "../toast/toast";

type props = {
  loadPatients: (query: PatientSearchQuery) => Promise<Patient[]>;
  onResults: (ps: Patient[]) => void;
};

const PatientsSearch: FunctionComponent<props> = ({
  loadPatients,
  onResults,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const makeRequest = (inputValue: string) => {
    setIsLoading(true);
    const sq: PatientSearchQuery = {
      name: inputValue,
      ehrID: inputValue,
      id: inputValue,
    };
    loadPatients(sq)
      .then((ps) => {
        setIsLoading(false);
        onResults(ps);
        setError("");
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  };
  return (
    <div>
      <label htmlFor="search-user">
        <input
          name="search-user"
          placeholder="Search by name, emp ID"
          onChange={(e) => makeRequest(e.target.value)}
        />
      </label>
      <Loader isLoading={isLoading} />
      {error && (
        <ToastBox
          title="An error occurred"
          message={error}
          status="error"
        />
      )}
    </div>
  );
};

export default PatientsSearch;
