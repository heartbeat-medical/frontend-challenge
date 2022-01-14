import { FunctionComponent, useState } from "react";
import { Patient } from "../../models/PatientModel";
import { PatientSearchQuery } from "../../models/PatientSearchQueryModel";

type props = {
  loadPatients: (query: PatientSearchQuery) => Promise<Patient[]>;
  onResults: (ps: Patient[]) => void;
  setLoading: (isLoading: boolean) => void;
};

export const PatientsSearch: FunctionComponent<props> = ({
  loadPatients,
  onResults,
  setLoading,
}) => {
  const [query, updateQuery] = useState("");
  const makeRequest = () => {
    const sq: PatientSearchQuery = {
      name: query,
      ehrID: query,
      id: query,
    };
    setLoading(true);
    loadPatients(sq)
      .then((ps) => onResults(ps))
      .catch((err) => alert(err))
      .finally(()=> setLoading(false));
  };
  return (
    <div>
      <input
        onChange={(e) => {
          updateQuery(e.target.value);
          makeRequest();
        }}
      />
    </div>
  );
};
