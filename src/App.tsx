import React, { useState } from "react";
import "./App.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Patient, PatientsService } from "./patients/patients";
import { createNewPatientsApi } from "./patients/patients_api";
import { PatientsLoader } from "./patients/patients_loader_button";
import { PatientsSearch } from "./patients/patients_search";
import { ToastBox } from "./toast/toast";
import { Oval } from  'react-loader-spinner';

function App() {
  const [patients, updatePatients] = useState<Patient[]>([]);
  const [isLoading, setIsloading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [patientsApi] = useState<PatientsService>(
    createNewPatientsApi("http://localhost:3000")
  );

  const showError = (message:string) => {
    setErrorMessage(message); 
    setTimeout(() => setIsError(false), 3000);
  }

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
            setLoading={setIsloading}
            setError={setIsError}
            setErrorMessage={showError}
          />
          <PatientsSearch
            loadPatients={patientsApi.Search}
            onResults={updatePatients}
            setLoading={setIsloading}
            setError={setIsError}
            setErrorMessage={showError}
          />
          {isLoading ?
            <Oval
              height="100"
              width="100"
              color='grey'
              ariaLabel='loading'
            />
            :
            patients.length > 0 && displayPatients(patients)
          }          
        </div>
        {isError ? 
        <ToastBox
        title="An error occurred"
        message={errorMessage}
        status="error"
      />
        : 
        <></>}
        
      </header>
    </div>
  );
}

export default App;

function displayPatients(patients: Patient[]) {
  return (
    <ul>
      {patients.map((p, k) => (
        <li style={{ listStyle: "none" }} key={k}>
          ✅ {p.name}{" "}
        </li>
      ))}
    </ul>
  );
}
