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

export interface SearchResultType {
  jobs: JobListingType[];
  num_paginable_jobs: number;
  success: boolean;
  total_jobs: number;
}

interface SearchContextState {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  location: string;
  setLocation: (location: string) => void;
  timePosted: number;
  setTimePosted: (timePosted: number) => void;
  radius: number;
  setRadius: (radius: number) => void;
  jobType: string;
  setJobType: (jobType: string) => void;
  jobListings: SearchResultType | null;
  setJobListings: (searchResult: SearchResultType) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: boolean;
  setError: (error: boolean) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export const SearchContext = React.createContext<SearchContextState>({
  searchTerm: "",
  setSearchTerm: () => {},
  location: "",
  setLocation: () => {},
  timePosted: 0,
  setTimePosted: () => {},
  radius: 10,
  setRadius: () => {},
  jobType: "",
  setJobType: () => {},
  jobListings: null,
  setJobListings: () => {},
  isLoading: false,
  setIsLoading: () => {},
  error: false,
  setError: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
});

export const useSearchContext = () =>
  React.useContext<SearchContextState>(SearchContext);

interface Props {
  children: React.ReactNode;
}

export function SearchContextController({ children }: Props) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [error, setError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [timePosted, setTimePosted] = React.useState(0);
  const [radius, setRadius] = React.useState(5);
  const [jobType, setJobType] = React.useState("");
  const [jobListings, setJobListings] = React.useState<SearchResultType | null>(
    null
  );

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
      isLoading,
      setIsLoading,
      error,
      setError,
      currentPage,
      setCurrentPage,
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
      isLoading,
      setIsLoading,
      error,
      setError,
      currentPage,
      setCurrentPage,
    ]
  );

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}
