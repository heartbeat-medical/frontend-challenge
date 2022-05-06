import { FunctionComponent, useEffect, useState } from "react";
import { Patient, PatientSearchQuery } from "./patients";
import { debounce } from "lodash";
import { useToast } from "../toast/ToastProvider";
import { usePatientsProvider } from "./PatientsProvider";

export const PatientsSearch: FunctionComponent = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const { patientsApi, updatePatients } = usePatientsProvider();

  useEffect(() => {
    makeRequest();
  }, [query]);

  const makeRequest = () => {
    setLoading(true);
    const sq: PatientSearchQuery = {
      name: query,
    };

    patientsApi
      .Search(sq)
      .then((ps) => {
        updatePatients(ps);
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
