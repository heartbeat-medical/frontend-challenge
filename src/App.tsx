import React, { useState } from "react";
import "./App.css";
import { Patient, PatientsService } from "./patients/patients";
import { createNewPatientsApi } from "./patients/patients_api";
import { PatientsLoader } from "./patients/patients_loader_button";
import { PatientsSearch } from "./patients/patients_search";
import ToastContainer from "./components/toast/toast_container";

function App() {
  const [patients, updatePatients] = useState<Patient[]>([]);

  const [patientsApi] = useState<PatientsService>(
    createNewPatientsApi("http://localhost:3000")
  );

  return (
    <>
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
            <DisplayPatients patients={patients} />
          </div>
        </header>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;

type props = { patients: Patient[] };
export const DisplayPatients = ({ patients }: props) => {
  return (
    <div data-testid="patient">
      {(patients || []).map((p, k) => (
        <p key={k}>✅ {p.name} </p>
      ))}
    </div>
  );
};
