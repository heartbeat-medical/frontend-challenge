import { useState } from "react";
import { Patient, PatientsService } from "./modules/patients/patients";
import { createNewPatientsApi } from "./modules/patients/patients_api";
import PatientsLoader from "./modules/patients/patients_loader_button";
import PatientsSearch from "./modules/patients/patients_search";
import { Header, Footer, ContentBox, List } from "./components";
import "./App.css";

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
          <ContentBox>
            <PatientsSearch
              loadPatients={patientsApi.Search}
              onResults={updatePatients}
            />
          </ContentBox>
          <h3>Or</h3>
          <PatientsLoader
            loadPatients={patientsApi.All}
            onLoaded={updatePatients}
          />
          {patients.length > 0 && <List patients={patients} />}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
