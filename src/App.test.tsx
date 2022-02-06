import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

it("renders initial search page", () => {
  render(<App />);

  const searchField = screen.getByTestId("searchTerm").querySelector("input");
  expect(searchField).toBeInTheDocument();

  const locationField = screen.getByTestId("location").querySelector("input");
  expect(locationField).toBeInTheDocument();

  const findJobsButton = screen.getByTestId("findJobsButton");
  expect(findJobsButton).toBeInTheDocument();

  const datePostedField = screen
    .getByTestId("datePosted")
    .querySelector("input");
  expect(datePostedField).toBeInTheDocument();

  const radiusField = screen.getByTestId("radius").querySelector("input");
  expect(radiusField).toBeInTheDocument();

  const initialSearchText = screen.getByText(/search to get started/i);
  expect(initialSearchText).toBeInTheDocument();
});
