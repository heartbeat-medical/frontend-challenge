import { FunctionComponent, useState } from 'react';
import { Patient, PatientSearchQuery } from './patients';

type props = {
  loadPatients: (query: PatientSearchQuery) => Promise<Patient[]>;
  onResults: (ps: Patient[]) => void;
};

export const PatientsSearch: FunctionComponent<props> = ({
  loadPatients,
  onResults,
}) => {
  const [query, updateQuery] = useState('');
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
      <input
        onChange={(e) => {
          updateQuery(e.target.value);
          makeRequest();
        }}
      />
    </div>
  );
};
