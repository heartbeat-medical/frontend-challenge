import { FunctionComponent, useState, useEffect } from "react";
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

  useEffect(() => {
    const makeRequest = () => {
      const sq: PatientSearchQuery = {
        name: query,
        ehrID: query,
        id: query,
      };
      if(sq) {
        loadPatients(sq)
        .then((ps) => onResults(ps))
        .catch((err) => alert(err));
      }

    };

    makeRequest();
  }, [query, loadPatients, onResults])


  const handleChange = (e: any) => {
    updateQuery(e.target.value);
  }

  return (
    <div>
      <input
        onChange={handleChange}
      />
    </div>
  );
};

type psearchboxprops = {
  onQueryChange: (query: PatientSearchQuery) => void;
};
