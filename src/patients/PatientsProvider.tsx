import React, { createContext, useContext, useEffect, useState } from "react";
import { Patient, PatientsService } from "./patients";
import { createNewPatientsApi } from "./patients_api";

const PatientsContext = createContext({
  patients: [] as Patient[],
  patientsApi: createNewPatientsApi("http://localhost:3000"),
  updatePatients: (patients: Patient[]) => {},
});

const PatientsProvider = ({ children }: { children: JSX.Element }) => {
  const [patients, updatePatients] = useState<Patient[]>([]);
  const [patientsApi] = useState<PatientsService>(
    createNewPatientsApi("http://localhost:3000")
  );

  useEffect(() => {
    console.log("patients: ", patients);
  }, [patients]);

  return (
    <PatientsContext.Provider value={{ patients, patientsApi, updatePatients }}>
      {children}
    </PatientsContext.Provider>
  );
};

const usePatientsProvider = () => {
  const { patients, patientsApi, updatePatients } = useContext(PatientsContext);
  return { patients, patientsApi, updatePatients };
};

export { usePatientsProvider, PatientsContext };

export default PatientsProvider;
