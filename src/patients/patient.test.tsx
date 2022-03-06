
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Patients from './Patients';

jest.mock('./patients_api', () => ({
  createNewPatientsApi: () => ({ 
    All: jest.fn().mockResolvedValue([{ id: 1, name: 'patientName1', ehrID: 'ehr1' }]),
    Search: jest.fn().mockResolvedValue([{ id: 'id', name: 'patientName2', ehrID: 'ehr2' }]),
  })
}));


test('get all patients return correct values', async() => {
  render(<Patients />)
  const getAllPatientsButton = screen.getByRole('button', { name: /load all patients/i });
  userEvent.click(getAllPatientsButton);
  const patient = await screen.findByTestId('test-1');
  expect(patient).toBeInTheDocument();
  expect(patient.textContent?.includes('patientName')).toBeTruthy();
})

test('search patients return correct values', async() => {
  render(<Patients />)
  const queryInput = screen.getByRole('textbox');
  userEvent.type(queryInput, 'id');
  const patient = await screen.findByTestId('test-id');
  expect(patient).toBeInTheDocument();
  expect(patient.textContent?.includes('patientName2')).toBeTruthy();
})