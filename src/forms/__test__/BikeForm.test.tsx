import React, { act } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import BikeForm from "../BikeForm";
import { BrowserRouter } from "react-router-dom";
import { BikeContextProvider } from "../../contexts/BikeContext";
import { AppContextProvider } from "../../contexts/AppContext";
import { FormContextProvider } from "../../contexts/FormContext";

const MockWrapped = () => {
  return (
    <BikeContextProvider>
      <FormContextProvider>
        <AppContextProvider>
          <BrowserRouter>
            <BikeForm />
          </BrowserRouter>
        </AppContextProvider>
      </FormContextProvider>
    </BikeContextProvider>
  );
};

describe("BikeForm rendering", () => {
  it("renders brand input", async () => {
    render(<MockWrapped />);
    const inputElement = screen.getByPlaceholderText("Enter bike brand");
    expect(inputElement).toBeInTheDocument();
  });
  it("renders modelName input", async () => {
    render(<MockWrapped />);
    const inputElement = screen.getByPlaceholderText("Enter bike model");
    expect(inputElement).toBeInTheDocument();
  });
  it("renders year input", async () => {
    render(<MockWrapped />);
    const inputElement = screen.getByTestId("year");
    expect(inputElement).toBeInTheDocument();
  });

  it("fills out brand input", async () => {
    render(<MockWrapped />);
    const inputElement = screen.getByPlaceholderText(
      "Enter bike brand"
    ) as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: "Avanti" } });
    expect(inputElement).toHaveValue("Avanti");
  });
});

describe("BikeForm inputs data entry", () => {
  it("fills out brand input", async () => {
    render(<MockWrapped />);
    const inputElement = screen.getByPlaceholderText("Enter bike brand");

    fireEvent.change(inputElement, { target: { value: "Avanti" } });
    expect(inputElement).toHaveValue("Avanti");
  });

  it("fills out modelName input", async () => {
    render(<MockWrapped />);
    const inputElement = screen.getByPlaceholderText("Enter bike model");
    fireEvent.change(inputElement, { target: { value: "Avanti" } });
    expect(inputElement).toHaveValue("Avanti");
  });

  it("selects year input", async () => {
    render(<MockWrapped />);
    const inputElement = screen.getByTestId("year") as HTMLSelectElement;
    fireEvent.change(inputElement, { target: { value: "2023" } });
    expect(inputElement).toHaveValue("2023");
  });
});


