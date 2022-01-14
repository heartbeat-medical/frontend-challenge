// PatientSearchQuery, a search query which allows
// searching by name, id or ehrID.
export type PatientSearchQuery = {
    name?: string;
    id?: string;
    ehrID?: string;
};