import { Patient } from "../../models/PatientModel";

// isPatients, type predicate to check an unknown is an array of Patients
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
