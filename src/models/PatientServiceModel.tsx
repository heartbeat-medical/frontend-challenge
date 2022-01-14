import { Patient } from "./PatientModel";
import { PatientSearchQuery } from "./PatientSearchQueryModel";

export interface PatientService {
    All(): Promise<Patient[]>;
    Get(id: string): Promise<Patient>;
    Search(query: PatientSearchQuery): Promise<Patient[]>;
}