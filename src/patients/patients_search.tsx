import { FunctionComponent, useEffect, useState } from "react";
import { Patient, PatientSearchQuery } from "./patients";
import { debounce } from "lodash";
import { useToast } from "../toast/ToastProvider";

type props = {
  loadPatients: (query: PatientSearchQuery) => Promise<Patient[]>;
  onResults: (ps: Patient[]) => void;
};

export const PatientsSearch: FunctionComponent<props> = ({
  loadPatients,
  onResults,
}) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    makeRequest();
  }, [query]);

  const makeRequest = () => {
    setLoading(true);
    const sq: PatientSearchQuery = {
      name: query,
    };

    loadPatients(sq)
      .then((ps) => {
        onResults(ps);
        setLoading(false);
      })
      .catch((err) => {
        addToast({
          title: "Error searching patients",
          message: err,
          status: "error",
        });
        setLoading(false);
      });
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const debouncedHandler = debounce(changeHandler, 300);

  return (
    <div>
      <input onChange={debouncedHandler} aria-label="search-input" />
      {loading && <div>Loading...</div>}
    </div>
  );
};

type psearchboxprops = {
  onQueryChange: (query: PatientSearchQuery) => void;
};
