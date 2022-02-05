import { findByTestId, getByTestId, render } from "@testing-library/react";
import React from "react";
import { SearchContextController } from "../contexts/SearchContext";
import SearchPage from "./Searchpage";

it("should get jobs listings based on given criteria", () => {});

// it("should show spinner on loading = true", () => {
//   const wrapper = render(<SearchPage />);
//   expect(wrapper.findByTestId("loadingSpinner").exists()).toEqual(true);
// });

test("username exists", () => {
  const { queryByTestId } = render(<SearchPage />);
  expect(queryByTestId("loadingSpinner")).toBeFalsy();
});
