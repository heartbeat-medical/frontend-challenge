import { FunctionComponent, useState } from "react";
import LoadingSpinner from "../components/loader/loader";
import { Patient, PatientSearchQuery } from "./patients";

type props = {
  loadPatients: (query: PatientSearchQuery) => Promise<Patient[]>;
  onResults: (ps: Patient[]) => void;
};

export const PatientsSearch: FunctionComponent<props> = ({
  loadPatients,
  onResults,
}) => {
  const [loader, setLoader] = useState(false);
  const makeRequest = (query: string) => {
    const sq: PatientSearchQuery = {
      name: query,
      ehrID: query,
      id: query,
    };
    setLoader(true);
    loadPatients(sq)
      .then((ps) => {
        onResults(ps);
      })
      .finally(() => setLoader(false));
  };
  return (
    <div style={{display: 'flex'}}>
      <input
        aria-label="search patient"
        placeholder="Search patient"
        style={{ marginRight: "10px", padding: '5px' }}
        onChange={(e) => {
          makeRequest(e.target.value);
        }}
      />
     <LoadingSpinner isLoading={loader} />
    </div>
  );
};

// type psearchboxprops = {
//   onQueryChange: (query: PatientSearchQuery) => void;
// };
