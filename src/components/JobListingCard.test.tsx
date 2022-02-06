import { render, screen } from "@testing-library/react";
import JobListingCard from "./JobListingCard";

it("renders data on screen", () => {
  render(
    <JobListingCard
      isMobile={false}
      timePosted={"1"}
      hiringCompanyName="My Company"
      jobId="jobId"
      jobSnippet="this is a job snippet"
      jobTitle="Job title"
      location="location"
      salary="100"
    />
  );
  expect(screen.getByText(/job title/i)).toBeInTheDocument();
  expect(screen.getByText(/my company/i)).toBeInTheDocument();
  expect(screen.getByText(/location/i)).toBeInTheDocument();
  expect(screen.getByText(/100/i)).toBeInTheDocument();
  expect(screen.getByText(/this is a job snippet/i)).toBeInTheDocument();
  expect(screen.getByText(/this is a job snippet/i)).toBeInTheDocument();
  expect(screen.getByText(/posted 1/i)).toBeInTheDocument();
});
