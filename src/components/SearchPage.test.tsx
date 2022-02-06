import { act, fireEvent, render, screen } from "@testing-library/react";
import { SearchContextController } from "../contexts/SearchContext";
import SearchPage from "./Searchpage";
import { emptyJobsMockData, fakeData } from "../helpers/mockedJobs";
import * as data from "./../helpers/FetchJobs";
import { JobListingContextController } from "../contexts/JobListingContext";
it("", () => {});
it("displays loading spinner", (done) => {
  render(
    <SearchContextController>
      <JobListingContextController>
        <SearchPage />
      </JobListingContextController>
    </SearchContextController>
  );

  const findJobsButton = screen.getByTestId("findJobsButton");

  act(() => {
    const mock = jest.spyOn(data, "fetchJobs").mockResolvedValueOnce(fakeData);
    fireEvent.click(findJobsButton);
    done();
    expect(mock).toHaveBeenCalledTimes(1);
  });

  act(() => {
    expect(screen.getByTestId("loadingSpinner")).toBeInTheDocument();
  });
});

it("displays jobs when search button is clicked", async () => {
  render(
    <SearchContextController>
      <JobListingContextController>
        <SearchPage />
      </JobListingContextController>
    </SearchContextController>
  );
  const mock = jest.spyOn(data, "fetchJobs").mockResolvedValueOnce(fakeData);

  const findJobsButton = screen.getByTestId("findJobsButton");

  act(() => {
    fireEvent.click(findJobsButton);

    expect(mock).toHaveBeenCalledTimes(1);
  });

  expect(await screen.findByTestId("jobListingCard")).toBeInTheDocument();
});

it("displays job details when clicking on job listing card", async () => {
  render(
    <SearchContextController>
      <JobListingContextController>
        <SearchPage />
      </JobListingContextController>
    </SearchContextController>
  );
  const mock = jest.spyOn(data, "fetchJobs").mockResolvedValueOnce(fakeData);

  const findJobsButton = screen.getByTestId("findJobsButton");

  act(() => {
    fireEvent.click(findJobsButton);

    expect(mock).toHaveBeenCalledTimes(1);
  });
  const jobListingCard = await screen.findByTestId("jobListingCardWrapper");
  // const jobListingCard = await screen.findByTestId("jobListingCard");
  act(() => {
    fireEvent.click(jobListingCard);
  });
  expect(await screen.findByTestId("jobListingDetails")).toBeInTheDocument();
});

it("display a message when no jobs", async () => {
  render(
    <SearchContextController>
      <JobListingContextController>
        <SearchPage />
      </JobListingContextController>
    </SearchContextController>
  );
  const mock = jest
    .spyOn(data, "fetchJobs")
    .mockResolvedValueOnce(emptyJobsMockData);

  const findJobsButton = screen.getByTestId("findJobsButton");

  act(() => {
    fireEvent.click(findJobsButton);

    expect(mock).toHaveBeenCalledTimes(1);
  });

  expect(await screen.findByText(/no jobs found/i)).toBeInTheDocument();
});

it("display an error message", async () => {
  render(
    <SearchContextController>
      <JobListingContextController>
        <SearchPage />
      </JobListingContextController>
    </SearchContextController>
  );
  const mock = jest.spyOn(data, "fetchJobs").mockImplementation(() => {
    throw new Error();
  });

  const findJobsButton = screen.getByTestId("findJobsButton");

  act(() => {
    fireEvent.click(findJobsButton);

    expect(mock).toHaveBeenCalledTimes(1);
  });

  expect(
    await screen.findByText(/Oops, something went wrong/i)
  ).toBeInTheDocument();
});
