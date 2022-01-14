import { PatientService } from './../../models/PatientServiceModel';
import { sleep } from "../../utils/sleep";
import { Patient } from '../../models/PatientModel';
import { isPatients } from './Patients';
import { PatientSearchQuery } from '../../models/PatientSearchQueryModel';

export function createNewPatientsApi(baseUrl: string): PatientService {
  return {
    All: () => {
      return new Promise<Patient[]>(async (resolve, reject) => {
        // Random flakiness
        if (Math.random() < 0.2) {
          reject("a network error occurred");
        }

        // Block for 1s
        await sleep(1000);

        fetch(baseUrl + `/data/patients.json`)
          .then((response) => response.json())
          .then((json) => {
            if (!isPatients(json)) {
              return reject("invalid response from server");
            }
            return resolve(json);
          })
          .catch(reject);
      });
    },
    Get: (id: string) => {
      return new Promise<Patient>(async (resolve, reject) => {
        // Block for 1s
        await sleep(1000);

        fetch(baseUrl + `/data/patients.json`)
          .then((response) => response.json())
          .then((json) => {
            if (!isPatients(json)) {
              return reject("invalid response from server");
            }
            const results = json.filter((p) => p.id === id);
            if (results.length < 1) {
              reject(`no patient found for id: ${id}`);
            }
            // Return first match
            return resolve(results[0]);
          })
          .catch(reject);
      });
    },
    Search: (query) => {
      return new Promise<Patient[]>(async (resolve, reject) => {
        if (!isQueryValid(query)) {
          // An empty query results in no
          // search results
          resolve([]);
        }
        // Block for 1s
        await sleep(1000);
        fetch(baseUrl + `/data/patients.json`)
          .then((response) => response.json())
          .then((json) => {
            if (!isPatients(json)) {
              return reject("invalid response from server");
            }
            return resolve(json.filter((p) => patientMatchesQuery(query, p)));
          })
          .catch(reject);
      });
    },
  };
}

// isQueryValid
function isQueryValid(query: PatientSearchQuery): boolean {
  return !(!query.ehrID && !query.id && !query.name);
}

function patientMatchesQuery(
  query: PatientSearchQuery,
  patient: Patient
): boolean {
  if (
    query.ehrID &&
    patient.ehrID.toLowerCase().includes(query.ehrID.toLowerCase())
  ) {
    return true;
  }
  if (
    query.name &&
    patient.name.toLowerCase().includes(query.name.toLowerCase())
  ) {
    return true;
  }
  if (query.id && patient.id.toLowerCase().includes(query.id.toLowerCase())) {
    return true;
  }
  return false;
}
