import React from "react";
import "./App.css";
import { PatientsPage } from "./pages/patients_page";


function App() {

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
          <PatientsPage />
        </div>
      </header>
    </div>
  );
}

export default App;
