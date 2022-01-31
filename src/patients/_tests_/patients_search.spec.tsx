import { fireEvent, render, waitFor, cleanup } from "../../test-utils";
import PatientsSearch from "../patients_search";

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
  it("on input search for user", async () => {
    const { getByPlaceholderText } = render(
      <PatientsSearch loadPatients={loadPatientMock} onResults={onResultsMock} />
    );
    const inp = getByPlaceholderText("Search by name, emp ID");
    fireEvent.change(inp, {
      target: { value: "Steve" },
    });
    await waitFor(() => expect(inp).toHaveValue("Steve"));
    await waitFor(() => expect(loadPatientMock).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(loadPatientMock).toHaveBeenCalledWith({"ehrID": "Steve", "id": "Steve", "name": "Steve"}));
  });
});
