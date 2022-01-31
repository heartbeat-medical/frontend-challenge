import { FunctionComponent, useState } from "react";
import { Patient, PatientSearchQuery } from "./patients";
import Loader from "../loader/loader";

type props = {
  loadPatients: (query: PatientSearchQuery) => Promise<Patient[]>;
  onResults: (ps: Patient[]) => void;
};

export const PatientsSearch: FunctionComponent<props> = ({
  loadPatients,
  onResults,
}) => {
  const [isLoading, setIsLoading] = useState(false);

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
      })
      .catch((err) => {
        setIsLoading(false);
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
    </div>
  );
};
