import { FunctionComponent, useState } from "react";
import { Patient } from "../../models/PatientModel";
import { PatientSearchQuery } from "../../models/PatientSearchQueryModel";
import { IToast } from "../../models/ToastModel";

type props = {
  loadPatients: (query: PatientSearchQuery) => Promise<Patient[]>;
  onResults: (ps: Patient[]) => void;
  setLoading: (isLoading: boolean) => void;
  setToast: (toast: IToast) => void;
};

export const PatientsSearch: FunctionComponent<props> = ({
  loadPatients,
  onResults,
  setLoading,
  setToast,
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
      .catch((err) => {
        setToast({
          title: 'Error!!!',
          message: err,
          status: 'danger'
        });
      })
      .finally(()=> setLoading(false));
  };
  return (
    <div>
      <input
        placeholder="Search..."
        onChange={(e) => {
          updateQuery(e.target.value);
          makeRequest();
        }}
      />
    </div>
  );
};
