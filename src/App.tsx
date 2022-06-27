import React, { useState } from "react";
import "./App.css";
import { Patient, PatientsService } from "./patients/patients";
import { createNewPatientsApi } from "./patients/patients_api";
import { PatientsLoader } from "./patients/patients_loader_button";
import { PatientsSearch } from "./patients/patients_search";
import { PatientsList } from "./patients/patients_list";

function App() {
  const [patients, updatePatients] = useState<Patient[]>([]);

  const [patientsApi] = useState<PatientsService>(
    createNewPatientsApi("http://localhost:3000")
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Heartbeat 🏥</h1>
        <div
          style={{
            border: "1px solid white",
            borderRadius: "8px",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
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
        </div>
      </header>
    </div>
  );
}

export default App;
