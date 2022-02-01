import { FunctionComponent as FC, useState } from "react";
import { Patient, PatientSearchQuery } from "./patients";
import { ToastBox, Loader } from "../../components";
import "./patients.css";

type props = {
  loadPatients: (query: PatientSearchQuery) => Promise<Patient[]>;
  onResults: (ps: Patient[]) => void;
};

const PatientsSearch: FC<props> = ({ loadPatients, onResults }) => {
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
        setError("");
        onResults(ps);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  };
  return (
    <>
      <form>
        <label htmlFor="search-user">
          <input
            name="search-user"
            placeholder="Search by name, emp ID"
            onChange={(e) => makeRequest(e.target.value)}
          />
        </label>
      </form>
      <Loader isLoading={isLoading} />
      {error && <ToastBox title={error && error.toString()} status="error" />}
    </>
  );
};

export default PatientsSearch;
