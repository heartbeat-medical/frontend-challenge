// Patient, is a patient in the Heartbeat system
export type Patient = {
  id: string;
  name: string;
  ehrID: string;
};
// PatientSearchQuery, a search query which allows
// searching by name, id or ehrID.
export type PatientSearchQuery = {
  name?: string;
  id?: string;
  ehrID?: string;
};

export interface PatientsService {
  All(): Promise<Patient[]>;
  Get(id: string): Promise<Patient>;
  Search(query: PatientSearchQuery): Promise<Patient[]>;
}

// isPatients, type predicate to check an unknown is
// an array of Patients
export function isPatients(ps: unknown): ps is Patient[] {
  if (!Array.isArray(ps)) {
    return false;
  }
  return ps.map(isPatient).length === ps.length;
}
// isPatients, type predicate to check an unknown is
// a Patient
export function isPatient(p: unknown): p is Patient {
  return (
    (p as Patient).id !== undefined &&
    (p as Patient).name !== undefined &&
    (p as Patient).ehrID !== undefined
  );
}
