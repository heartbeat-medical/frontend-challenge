import * as React from 'react';
import { Patient} from './patientsService'

type props = {
  patients: Patient[];
}

export const PatientList: React.FC<props> = ({ patients }) => { 
  if (patients.length === 0) { 
    return <div>do not have match data</div>
  }
  return (    
    <ul>
      {patients.map(({ name, id }) => <li key={id} data-testid={`test-${id}`}>✅ { name } </li>)}
    </ul>
  )
}