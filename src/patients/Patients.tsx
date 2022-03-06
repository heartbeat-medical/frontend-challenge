import * as React from 'react';
import type { Patient } from './patientsService';
import { createNewPatientsApi } from "./patients_api";
import { PatientsLoader } from './patients_loader_button';
import { PatientsSearch } from './patients_search';
import { ToastBox } from './../toast/toast';
import { PatientList } from './PatientList';

type patientState = {
  error: null | string;
  status: 'idle' | 'load' | 'done' | 'error';
  data: Patient[];
}

type action = {
  type: 'load' | 'done' | 'error';
  data?: Patient[];
  error: null | string;
}

const patientReducer = (state: patientState, action: action) => { 
  
  switch (action.type) {
    case 'load': {
      return {
        ...state,
        error: null,
        status: 'load',
      } as unknown as patientState;
    }
    case 'done': {
      return {
        ...state,
        data: action.data,
        status: 'done',
      } as unknown as patientState;
    }
    case 'error': {
      return { 
        data: [],
        error: action.error,
        status: 'error',
      } as unknown as patientState;
    }
    default: {
      return state
    }
  }
};




const Patients: React.FC = () => { 
  const [{ error, data, status}, dispatch] = React.useReducer(patientReducer, { error: null, data: [], status: 'idle' })

  const getAllPatients = async() => { 
    dispatch({ type: 'load' } as unknown as action);
    try {
      const patients = await createNewPatientsApi("http://localhost:3000").All();
      dispatch({ type: 'done', data: patients } as unknown as action);
    } catch (error) {
      dispatch({type: 'error', error: error as unknown as string })
    }
  }

  const getPatientsByQuery = async (query: {[key:string]:string}) => { 
    dispatch({ type: 'load' } as unknown as action);
    try { 
      const patients = await createNewPatientsApi("http://localhost:3000").Search(query);
      dispatch({ type: 'done', data: patients } as unknown as action);
    } catch (error) {
      dispatch({type: 'error', error: error as unknown as string })
    }
  }


  return (    
    <React.Fragment>
      <h2>Please load the patients using the button below or search</h2>
      <PatientsLoader loadPatients={getAllPatients} />
      <PatientsSearch updateQuery={getPatientsByQuery}/>
      {status === 'load' && <div>loading</div>}
      {status === 'done' && <PatientList patients={data}/>}
      {status === 'error' && <ToastBox
        title="An error occurred"
        message={error?? undefined}
        status="error"
      />}
    </React.Fragment>
)
}

export default Patients;