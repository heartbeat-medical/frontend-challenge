import { FunctionComponent, useEffect, useState } from "react";
import { Patient, PatientSearchQuery } from "./patients";

type props = {
  loadPatients: (query: PatientSearchQuery) => Promise<Patient[]>;
  onResults: (ps: Patient[]) => void;
  setLoading: (ps: boolean) => void;
  setError: (ps: boolean) => void;
  setErrorMessage: (ps: string) => void;
};

export const PatientsSearch: FunctionComponent<props> = ({
  loadPatients,
  onResults,
  setLoading,
  setError,
  setErrorMessage
}) => {
  const [query, updateQuery] = useState("");

  useEffect(() => {
    makeRequest();
  },[query])


  const makeRequest = () => { 
    
    const sq: PatientSearchQuery = {
      name: query,
      ehrID: query,
      id: query,
    };
    setLoading(true);
    loadPatients(sq)
      .then((ps) => onResults(ps))
      .catch((err) => {setError(true); setErrorMessage(err);}).finally(() => {
        setLoading(false);
      });
  };



  return (
    <div>
      <input
        onChange={(e) => {
          if (e.target.value.trim().length > 0)
            updateQuery(e.target.value)
        }}
      />
    </div>
  );
};

// type psearchboxprops = {
//   onQueryChange: (query: PatientSearchQuery) => void;
// };
