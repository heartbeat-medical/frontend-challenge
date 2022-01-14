import { FunctionComponent } from "react";
import { Patient } from "../../models/PatientModel";

type props = {
    patients: Patient[];
};

export const PatientsDetail: FunctionComponent<props> = ({ patients }) => {
    return (
        <ul>
            {
                patients.map((p, k) => (
                    <li style={{ listStyle: "none" }} key={k}>
                        ✅ {p.name}{" "}
                    </li>
                ))
            }
        </ul>
    );
}
  