import { FunctionComponent } from "react";
import { Patient } from "../../modules/patients/patients";

type props = {
  patients: Patient[];
};

const List: FunctionComponent<props> = ({ patients }) => (
  <ul>
    {patients.map(({name, ehrID}) => (
      <li style={{ listStyle: "none" }} key={ehrID}>
        ✅ {name}{" "}
      </li>
    ))}
  </ul>
);

export default List;
