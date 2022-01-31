import { FunctionComponent, useState } from "react";
import { Patient, PatientSearchQuery } from "./patients";

type props = {
  loadPatients: (query: PatientSearchQuery) => Promise<Patient[]>;
  onResults: (ps: Patient[]) => void;
};

export const PatientsSearch: FunctionComponent<props> = ({
  loadPatients,
  onResults,
}) => {
  const [query, updateQuery] = useState("");
  const makeRequest = () => {
    const sq: PatientSearchQuery = {
      name: query,
      ehrID: query,
      id: query,
    };
    loadPatients(sq)
      .then((ps) => onResults(ps))
      .catch((err) => alert(err));
  };
  return (
    <div>
      <label htmlFor="search-user">
        <input
          name="search-user"
          placeholder="Search by name, emp ID"
          onChange={(e) => {
            updateQuery(e.target.value);
            makeRequest();
          }}
        />
      </label>
    </div>
  );
};

type psearchboxprops = {
  onQueryChange: (query: PatientSearchQuery) => void;
};
