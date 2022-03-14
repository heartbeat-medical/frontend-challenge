import React from "react";
import {
  act,
  fireEvent,
  getByLabelText,
  render,
  waitFor,
} from "@testing-library/react";
import { PatientsSearch } from "./patients_search";
import userEvent from "@testing-library/user-event";

it("should call loadPatients when user types input", async () => {
  const mockLoadPatients = jest.fn().mockResolvedValue([]);
  const mockOnResults = jest.fn().mockReturnValue(null);

  const { getByLabelText } = render(
    <PatientsSearch loadPatients={mockLoadPatients} onResults={mockOnResults} />
  );

  const input = getByLabelText("search-input") as HTMLInputElement;

  act(() => {
    userEvent.type(input, "testing");
  });

  expect(mockLoadPatients).toHaveBeenCalledTimes(1);
  jest.clearAllMocks();
});

it("should equal input when user types text", async () => {
  const mockLoadPatients = jest.fn().mockResolvedValue([]);
  const mockOnResults = jest.fn().mockReturnValue(null);

  const { getByLabelText } = render(
    <PatientsSearch loadPatients={mockLoadPatients} onResults={mockOnResults} />
  );

  const input = getByLabelText("search-input") as HTMLInputElement;

  act(() => {
    userEvent.type(input, "testing");
  });

  expect(input.value).toBe("testing");
  jest.clearAllMocks();
});
