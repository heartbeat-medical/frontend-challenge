import { screen, render } from '@testing-library/react';
import { PatientsSearch } from './patients_search';
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils';

describe('<PatientsSearch />', () => {
  it('renders correctly', () => {
    const loadPatientsStub = jest.fn().mockResolvedValue([]);;
    const onResultsStub = jest.fn().mockResolvedValue(null);

    const { container } = render(
      <PatientsSearch 
        loadPatients={loadPatientsStub}
        onResults={onResultsStub} 
      />
    )

    expect(container).toMatchSnapshot();
  });

  it('searches for patients', async () => {
    const mockLoadPatients = jest.fn().mockResolvedValue([]);
    const stubOnResult = jest.fn().mockResolvedValue(null);
    render(
      <PatientsSearch
        loadPatients={mockLoadPatients}
        onResults={stubOnResult}
      />
    );

    const input = await screen.findByRole('textbox') as HTMLInputElement;

    await act(async () => {
      userEvent.type(input, 'Andre{enter}');
    });

    expect(input).toHaveFocus();
    expect(input).toHaveValue('Andre');
    expect(mockLoadPatients).toHaveBeenCalled();
  });
});
