import { FunctionComponent, useState, useEffect } from "react";
import { Patient, PatientSearchQuery } from "./patients";
import Loader from "../loader/loader";
import "./patients.css";
import { ToastBox } from "../toast/toast";

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
    <div className="site-content">
      <div className="site-heading">
        <h1>Welcome to Heartbeat 🏥</h1>
        <h3>Please load the patients using the button below or search</h3>
      </div>
      <div className="site-box">
        <div className="site-input-box">
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
        </div>
      </div>
      <Loader isLoading={isLoading} />
      {error && (
        <ToastBox
          title="An error occurred"
          message="There was an error loading your results"
          status="error"
        />
      )}
    </div>
  );
};

export default PatientsSearch2;
