import { FunctionComponent as FC, useState } from "react";
import { Patient, PatientSearchQuery } from "./patients";
import Loader from "../loader/loader";
import "./patients.css";
import { ToastBox } from "../toast/toast";

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
                onChange={(e) => makeRequest(e.target.value)}
              />
            </label>
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

export default PatientsSearch;
