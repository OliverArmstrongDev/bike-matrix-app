import React, { act } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import BikeList from "../BikeList";
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
            <BikeList />
          </BrowserRouter>
        </AppContextProvider>
      </FormContextProvider>
    </BikeContextProvider>
  );
};

describe("BikeList rendering", () => {
  it("renders the table onto the page", async () => {
    render(<MockWrapped />);

  const table = screen.getByRole('table');
  expect(table).toBeInTheDocument();
  
  const headers = screen.getAllByRole('cell');
  expect(headers).toHaveLength(4); 
  expect(headers[0]).toHaveTextContent('Brand');
  });
});
