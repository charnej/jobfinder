import * as React from "react";

interface JobListingContextState {
  selectedJobListing: string;
  setSelectedJobListing: (jobListing: string) => void;
}

export const JobListingContext = React.createContext<JobListingContextState>({
  selectedJobListing: "",
  setSelectedJobListing: () => {},
});

export const useJobListingContext = () =>
  React.useContext<JobListingContextState>(JobListingContext);

interface Props {
  children: React.ReactNode;
}

export function JobListingContextController({ children }: Props) {
  const [selectedJobListing, setSelectedJobListing] = React.useState("");

  const value = React.useMemo(
    () => ({
      selectedJobListing,
      setSelectedJobListing,
    }),
    [selectedJobListing, setSelectedJobListing]
  );

  return (
    <JobListingContext.Provider value={value}>
      {children}
    </JobListingContext.Provider>
  );
}
