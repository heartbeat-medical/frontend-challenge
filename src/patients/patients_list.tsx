import React from "react";
import { usePatientsProvider } from "./PatientsProvider";

export const PatientsList = () => {
  const { patients } = usePatientsProvider();

  if (patients.length === 0) {
    return <div>No patients</div>;
  }

  return (
    <ul style={{ margin: "auto", padding: "inherit" }}>
      {patients.map((p, k) => (
        <li style={{ listStyle: "none" }} key={k}>
          ✅ {p.name}{" "}
        </li>
      ))}
    </ul>
  );
};
