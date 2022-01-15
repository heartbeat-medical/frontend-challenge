import { useState } from "react";
import { createNewPatientsApi } from "./components/patients/PatientsApi";
import { PatientsLoader } from "./components/patients/PatientsLoader";
import { PatientsSearch } from "./components/patients/PatientsSearch";
import { SearchSpinner } from "./components/spinner/SearchSpinner";
import { Patient } from "./models/PatientModel";
import { PatientService } from "./models/PatientServiceModel";
import { PatientsDetail } from "./components/patients/PatientsDetail";
import { ToastBox } from "./components/toast/ToastBox";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [patients, updatePatients] = useState<Patient[]>([]);

  const [patientsApi] = useState<PatientService>(
    createNewPatientsApi("http://localhost:3000")
  );

  const [isLoading, setLoading] = useState(false);

  const [toast, setToast] = useState({});

  return (
    <>
      <header className="header">
        <h1>Welcome to Heartbeat 🏥</h1>
      </header>
      <div className="main">
        <h4>Please load the patients using the button below or search</h4>
        <div className="actions">
          <PatientsLoader
            loadPatients={patientsApi.All}
            onLoaded={updatePatients}
            setLoading={setLoading}
            disabled={isLoading}
            setToast={setToast}
          />
          <PatientsSearch
            loadPatients={patientsApi.Search}
            onResults={updatePatients}
            setLoading={setLoading}
            setToast={setToast}
          />
        </div>
        { isLoading && <SearchSpinner /> }
        { patients.length > 0 && <PatientsDetail patients={patients} /> }
        <ToastBox toast={toast} />
      </div>
    </>
  );
}

export default App;