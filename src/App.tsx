import React from "react";
import "./App.css";
import PatientsProvider from "./patients/PatientsProvider";
import { PatientsList } from "./patients/patients_list";
import { PatientsLoader } from "./patients/patients_loader_button";
import { PatientsSearch } from "./patients/patients_search";
import ToastProvider from "./toast/ToastProvider";

function App() {
  return (
    <div className="App">
      <PatientsProvider>
        <ToastProvider>
          <header className="App-header">
            <h1>Welcome to Heartbeat 🏥</h1>
            <div className="App-container">
              <h2>Please load the patients using the button below or search</h2>
              <PatientsLoader />
              <PatientsSearch />
              <PatientsList />
            </div>
          </header>
        </ToastProvider>
      </PatientsProvider>
    </div>
  );
}

export default App;
