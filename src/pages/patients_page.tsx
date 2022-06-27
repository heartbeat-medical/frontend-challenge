import React, { useState } from "react";
import { PatientsLoader } from "../patients/patients_loader_button";
import { PatientsSearch } from "../patients/patients_search";
import { PatientsList } from "../patients/patients_list";
import { Patient, PatientsService } from "../patients/patients";
import { createNewPatientsApi } from "../patients/patients_api";

export const PatientsPage = () => {
  const [patients, updatePatients] = useState<Patient[]>([]);

  const [patientsApi] = useState<PatientsService>(
    createNewPatientsApi("http://localhost:3000")
  );

  return (
    <>
      <h2>Please load the patients using the button below or search</h2>
      <PatientsLoader
        loadPatients={patientsApi.All}
        onLoaded={updatePatients}
      />
      <PatientsSearch
        loadPatients={patientsApi.Search}
        onResults={updatePatients}
      />
      <PatientsList
        patients={patients}
      />
    </>
  )
};
