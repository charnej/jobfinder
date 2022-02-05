import { SearchResultType } from "../contexts/SearchContext";

export const fetchJobs3 = (
  searchTerm: string,
  location: string,
  radius: number,
  timePosted: number,
  currentPage: number,
  apiKey: string,
  setIsLoading: (loading: boolean) => void,
  setError: (error: boolean) => void,
  setJobListings: (searchResult: SearchResultType) => void
) => {
  setIsLoading(true);
  setError(false);
  fetch(
    `https://api.ziprecruiter.com/jobs/v1?search=${searchTerm}&location=${location}&radius_miles=${radius}&days_ago=${timePosted}&jobs_per_page=10&page=${currentPage}&api_key=${apiKey}`
  )
    .then((res) => res.json())
    .then(
      (result) => {
        setIsLoading(false);
        setJobListings(result);
      },
      (error) => {
        console.log("error");
        setIsLoading(false);
        setError(error);
      }
    );
};
