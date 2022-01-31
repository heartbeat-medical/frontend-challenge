import { FunctionComponent, useState } from "react";
import { Patient } from "./patients";
import Loader from "../loader/loader";
import { ToastBox } from "../toast/toast";
import "./patients.css";

type props = {
  loadPatients: () => Promise<Patient[]>;
  onLoaded: (ps: Patient[]) => void;
};

const PatientsLoader: FunctionComponent<props> = ({
  loadPatients,
  onLoaded,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const makeRequest = () => {
    setIsLoading(true);
    loadPatients()
      .then((ps) => {
        setIsLoading(false);
        setError("");
        onLoaded(ps);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  };
  return (
    <div className="site-content">
      <div className="site-box">
        <div className="site-input-box">
          <button onClick={makeRequest} className="search-submit">
            Load all patients
          </button>
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
    </div>
  );
};

export default PatientsLoader;
