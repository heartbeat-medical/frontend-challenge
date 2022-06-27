import { sleep } from '../utils/sleep';
import {
  isPatients,
  PatientsService,
  Patient,
  PatientSearchQuery,
} from './patients';

/**
 * This fake API is used to simulate an actual backend for the purpose of this
 * code challenge.
 *
 * The solution of the challenge doesn't require changes to this file!
 */

export function createNewPatientsApi(baseUrl: string): PatientsService {
  return {
    All: () => {
      return new Promise<Patient[]>(async (resolve, reject) => {
        // Block for 1s
        await sleep(1000);

        // Random flakiness
        if (Math.random() <= 0.5) {
          reject('a network error occurred');
          return;
        }

        fetch(baseUrl + `/data/patients.json`)
          .then((response) => response.json())
          .then((json) => {
            if (!isPatients(json)) {
              return reject('invalid response from server');
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
              return reject('invalid response from server');
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
        // Block for 1s
        await sleep(1000);
        if (!isQueryValid(query)) {
          // An empty query results in no
          // search results
          resolve([]);
        }
        fetch(baseUrl + `/data/patients.json`)
          .then((response) => response.json())
          .then((json) => {
            if (!isPatients(json)) {
              return reject('invalid response from server');
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
