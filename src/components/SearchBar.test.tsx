import {
  findByTestId,
  fireEvent,
  getByTestId,
  render,
  screen,
} from "@testing-library/react";
import React from "react";
import { JobListingContextController } from "../contexts/JobListingContext";
import { SearchContextController } from "../contexts/SearchContext";
import SearchBar from "./SearchBar";

// it("should search for jobs", () => {
//   const contextCallback = jest.fn();
//   const { getAllByTestId } = render(
//     <SearchContextController>
//       <JobListingContextController>
//         <SearchBar />
//       </JobListingContextController>
//     </SearchContextController>
//   );

//   const submitButton = getAllByTestId("findJobsButton");
//   fireEvent.click(submitButton[0]);

//   expect(contextCallback.mock.calls[0]).to;
// });

// it("should search for jobs", () => {
//   const contextCallback = jest.fn();
//   const { getByTestId } = render(
//     <SearchContextController>
//       <JobListingContextController>
//         <SearchBar />
//       </JobListingContextController>
//     </SearchContextController>
//   );

//   const submitButton = getByTestId("findJobsButton");
//   fireEvent.click(submitButton);

//   //   expect(contextCallback.mock.calls[0]).to;
// });

it("see if search textfield renders", () => {
  const contextCallback = jest.fn();
  const { getByTestId } = render(
    <SearchContextController>
      <JobListingContextController>
        <SearchBar />
      </JobListingContextController>
    </SearchContextController>
  );
  expect(getByTestId("searchTerm")).toBeTruthy();
});
