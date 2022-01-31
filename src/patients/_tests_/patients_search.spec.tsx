import { fireEvent, render, waitFor, cleanup } from "../../test-utils";
import { PatientsSearch } from "../patients_search";

describe("Patient Search test case", () => {
  let loadPatientMock: jest.Mock<any, any>;
  let onResultsMock: jest.Mock<any, any>;
  beforeEach(() => {
    loadPatientMock = jest.fn().mockImplementation(() => Promise.resolve());
    onResultsMock = jest.fn();
  });
  afterEach(() => {
    cleanup();
  });
  it("matches snapshot", () => {
    const { asFragment } = render(<PatientsSearch loadPatients={loadPatientMock} onResults={onResultsMock} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
