import { FunctionComponent, Key } from "react";
import { Patient } from "./patients";

type props = {
  patients: Patient[]
}

export const PatientsList: FunctionComponent<props> = ({
  patients
}) => {
  return(
    <ul>
      { patients.length > 0 && patients.map((p: Patient, k:Key) => (
        <li style={{ listStyle: "none" }} key={k}>
          ✅ {p.name}{" "}
        </li>
      ))}
  </ul>    
  );
}
