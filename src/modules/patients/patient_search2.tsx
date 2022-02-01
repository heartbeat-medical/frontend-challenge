import { FunctionComponent, useState, useEffect } from "react";
import { Patient, PatientSearchQuery } from "./patients";
import { ToastBox, Loader } from "../../components";
import "./patients.css";

type props = {
  loadPatients: (query: PatientSearchQuery) => Promise<Patient[]>;
  onResults: (ps: Patient[]) => void;
};

const PatientsSearch2: FunctionComponent<props> = ({
  loadPatients,
  onResults,
}) => {
  const [query, updateQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const sq: PatientSearchQuery = {
      name: query,
      ehrID: query,
      id: query,
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
  }, [loadPatients, onResults, query]);

  return (
    <>
      <form>
        <label htmlFor="search-user">
          <input
            name="search-user"
            placeholder="Search by name, emp ID"
            onChange={(e) => {
              updateQuery(e.target.value);
            }}
          />
        </label>
        <button
          aria-label="trigger search"
          data-testid="search-submit"
          type="submit"
          className="search-submit"
        >
          Search
        </button>
      </form>
      <Loader isLoading={isLoading} />
      {error && <ToastBox title={error && error.toString()} status="error" />}
    </>
  );
};

export default PatientsSearch2;
