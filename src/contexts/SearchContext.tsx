import * as React from "react";

export interface JobListingType {
  buyer_type: string;
  category: string;
  city: string;
  country: string;
  has_zipapply: boolean;
  id: string;
  industry_name: string;
  job_age: number;
  location: string;
  name: string;
  posted_time: string;
  posted_time_friendly: string;
  salary_interval: number | null;
  salary_max: number | null;
  salary_max_annual: number | null;
  salary_min: number | null;
  salary_min_annual: number | null;
  salary_source: string | null;
  snippet: string;
  source: string;
  state: string;
  url: string;
  hiring_company: {
    description: string | null;
    id: string | null;
    name: string;
    url: string | null;
  };
}

interface SearchResultType {
  jobs: JobListingType[];
  num_paginable_jobs: number;
  success: boolean;
  totalJobs: number;
}

interface SearchContextState {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  location: string;
  setLocation: (location: string) => void;
  timePosted: string;
  setTimePosted: (timePosted: string) => void;
  radius: number;
  setRadius: (radius: number) => void;
  jobType: string;
  setJobType: (jobType: string) => void;
  jobListings: SearchResultType;
  setJobListings: (searchResult: SearchResultType) => void;
}

export const SearchContext = React.createContext<SearchContextState>({
  searchTerm: "",
  setSearchTerm: () => {},
  location: "",
  setLocation: () => {},
  timePosted: "",
  setTimePosted: () => {},
  radius: 0,
  setRadius: () => {},
  jobType: "",
  setJobType: () => {},
  jobListings: {
    jobs: [],
    num_paginable_jobs: 0,
    success: false,
    totalJobs: 0,
  },
  setJobListings: () => {},
});

export const useSearchContext = () =>
  React.useContext<SearchContextState>(SearchContext);

interface Props {
  children: React.ReactNode;
}

export function SearchContextController({ children }: Props) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [timePosted, setTimePosted] = React.useState("");
  const [radius, setRadius] = React.useState(0);
  const [jobType, setJobType] = React.useState("");
  const [jobListings, setJobListings] = React.useState<SearchResultType>({
    jobs: [],
    num_paginable_jobs: 0,
    success: false,
    totalJobs: 0,
  });

  const value = React.useMemo(
    () => ({
      searchTerm,
      setSearchTerm,
      location,
      setLocation,
      timePosted,
      setTimePosted,
      radius,
      setRadius,
      jobType,
      setJobType,
      jobListings,
      setJobListings,
    }),
    [
      searchTerm,
      setSearchTerm,
      location,
      setLocation,
      timePosted,
      setTimePosted,
      radius,
      setRadius,
      jobType,
      setJobType,
      jobListings,
      setJobListings,
    ]
  );

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}
