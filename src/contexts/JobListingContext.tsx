import * as React from "react";

interface JobListingContextState {
  selectedJobListing: string | null;
  setSelectedJobListing: (jobListing: string | null) => void;
  openJobListingDetails: boolean;
  setOpenJobListingDetails: (open: boolean) => void;
  jobListingNode: JSX.Element | null;
  setJobListingNode: (element: JSX.Element | null) => void;
}

export const JobListingContext = React.createContext<JobListingContextState>({
  selectedJobListing: null,
  setSelectedJobListing: () => {},
  jobListingNode: null,
  setJobListingNode: () => {},
  openJobListingDetails: false,
  setOpenJobListingDetails: () => {},
});

export const useJobListingContext = () =>
  React.useContext<JobListingContextState>(JobListingContext);

interface Props {
  children: React.ReactNode;
}

export function JobListingContextController({ children }: Props) {
  const [openJobListingDetails, setOpenJobListingDetails] =
    React.useState(false);
  const [selectedJobListing, setSelectedJobListing] = React.useState<
    string | null
  >(null);
  const [jobListingNode, setJobListingNode] =
    React.useState<JSX.Element | null>(null);
  const value = React.useMemo(
    () => ({
      selectedJobListing,
      setSelectedJobListing,
      jobListingNode,
      setJobListingNode,
      openJobListingDetails,
      setOpenJobListingDetails,
    }),
    [
      selectedJobListing,
      setSelectedJobListing,
      jobListingNode,
      setJobListingNode,
      openJobListingDetails,
      setOpenJobListingDetails,
    ]
  );

  return (
    <JobListingContext.Provider value={value}>
      {children}
    </JobListingContext.Provider>
  );
}
