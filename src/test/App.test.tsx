import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App, { DisplayPatients } from "../App";

describe("App", () => {
  it("should render without errors", () => {
    render(<App />);
  });

  it("should renders input", () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/search patient/i);
    expect(inputElement).toBeInTheDocument();
  });

  it("should be able to type in input", () => {
    render(<App />);
    const inputElement: any = screen.getByPlaceholderText(/search patient/i);
    fireEvent.change(inputElement, { target: { value: "steve" } });
    expect(inputElement.value).toBe("steve");
  });

  it("should be able to trigger event onClick button ", async () => {
    render(<App />);
    const buttonElement = screen.getByTestId("load-patient");
    expect(buttonElement).toBeInTheDocument();
  });

  test("triggers search event on change input", () => {
    render(<App />);
    const makeRequest = jest.fn();
    const textField: any = screen.getByLabelText("search patient");
    textField.onchange = () => makeRequest();
    fireEvent.change(textField, { target: { value: "steve" } });
    expect(textField.value).toBe("steve");
    expect(makeRequest).toBeCalled();
  });

  it("should render patients", () => {
    render(<DisplayPatients patients={[]} />);

    const patient = screen.getByTestId("patient");
    expect(patient).toBeInTheDocument();
  });
});
