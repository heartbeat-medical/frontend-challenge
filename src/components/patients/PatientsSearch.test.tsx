import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Patient } from "../../models/PatientModel";
import { PatientSearchQuery } from "../../models/PatientSearchQueryModel";
import { IToast } from "../../models/ToastModel";
import { PatientsSearch } from "./PatientsSearch";

interface IProps {
    loadPatients: (query: PatientSearchQuery) => Promise<Patient[]>;
    onResults: (ps: Patient[]) => void;
    setLoading: (isLoading: boolean) => void;
    setToast: (toast: IToast) => void;
}

const renderComponent = (props: IProps) => render(<PatientsSearch {...props} />);

describe("<PatientsSearch />", () => {
    const patients = [{id: 'test', name: 'test', ehrID: 'test'}];
    const searchText = 'Test';
    const loadPatientsMock = (): Promise<Patient[]> => new Promise<Patient[]>((resolve) => resolve(patients));
    const onResultsMock = jest.fn();
    const setLoadingMock = jest.fn();
    const setToastMock = jest.fn();

    test("loads and renders", () => {        
        const { getByPlaceholderText } = renderComponent({
            loadPatients: loadPatientsMock,
            onResults: onResultsMock,
            setLoading: setLoadingMock,
            setToast: setToastMock, 
        });
        expect(getByPlaceholderText('Search...')).toBeDefined();
    });

    describe('when enter search text', () => {
        test("returns the search result on success", async() => {        
            const { getByPlaceholderText } = renderComponent({
                loadPatients: loadPatientsMock,
                onResults: onResultsMock,
                setLoading: setLoadingMock,
                setToast: setToastMock, 
            });
            const searchInput = (getByPlaceholderText('Search...') as HTMLInputElement);
            userEvent.type(searchInput, 'test');
            await waitFor(() => {
                expect(setLoadingMock).toBeCalledWith(true);
                expect(setToastMock).not.toBeCalled();
                expect(onResultsMock).toBeCalledTimes(searchText.length);
                expect(onResultsMock).toBeCalledWith(patients);
            });
        });
    
        test("shows the toast error on failed", async() => {
            const errorMessage = "A server error occurred.";    
            const loadPatientsMock = jest.fn().mockRejectedValue(errorMessage);
            const { getByPlaceholderText } = renderComponent({
                loadPatients: loadPatientsMock,
                onResults: onResultsMock,
                setLoading: setLoadingMock,
                setToast: setToastMock, 
            });
            const searchInput = (getByPlaceholderText('Search...') as HTMLInputElement);
            userEvent.type(searchInput, 'test');
            await waitFor(() => {
                expect(setLoadingMock).toBeCalledWith(true);
                expect(loadPatientsMock).toBeCalled();
                expect(setToastMock).toBeCalledWith({
                    title: 'Error!!!',
                    message: errorMessage,
                    status: 'danger'
                });
            });
        });
    });    

    describe('when search is empty', () => {
        test("doesn't call the props functions", async() => {  
            renderComponent({
                loadPatients: loadPatientsMock,
                onResults: onResultsMock,
                setLoading: setLoadingMock,
                setToast: setToastMock, 
            });
            await waitFor(() => {
                expect(setLoadingMock).not.toBeCalled();
                expect(onResultsMock).not.toBeCalled();
                expect(setToastMock).not.toBeCalled();
            });
        });
    });
});