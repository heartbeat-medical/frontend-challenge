import { useState } from "react";
import "./App.css";
import { Patient, PatientsService } from "./patients/patients";
import { createNewPatientsApi } from "./patients/patients_api";
import PatientsLoader from "./patients/patients_loader_button";
import PatientsSearch from "./patients/patients_search";
import Header from "./header";
import Footer from "./footer";

const App = () => {
  const [patients, updatePatients] = useState<Patient[]>([]);
  const [patientsApi] = useState<PatientsService>(
    createNewPatientsApi("http://localhost:3000")
  );

  return (
    <div className="App">
      <div className="App-container">
        <Header />
        <div className="App-body">
          <PatientsSearch
            loadPatients={patientsApi.Search}
            onResults={updatePatients}
          />
          <h3>Or</h3>
          <PatientsLoader
            loadPatients={patientsApi.All}
            onLoaded={updatePatients}
          />
          {patients.length > 0 && displayPatients(patients)}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default App;

const displayPatients = (patients: Patient[]) => {
  return (
    <ul>
      {patients.map((p, k) => (
        <li style={{ listStyle: "none" }} key={k}>
          ✅ {p.name}{" "}
        </li>
      ))}
    </ul>
  );
};
