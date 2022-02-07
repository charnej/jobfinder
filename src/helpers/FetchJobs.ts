import { SearchResultType } from "../contexts/SearchContext";

export async function fetchJobs(
  searchTerm: string,
  location: string,
  radius: number,
  timePosted: number,
  currentPage: number
): Promise<SearchResultType> {
  const apiKey = "ENTER YOUR API KEY HERE";
  return (
    fetch(
      `https://api.ziprecruiter.com/jobs/v1?search=${searchTerm}&location=${location}&radius_miles=${radius}&days_ago=${timePosted}&jobs_per_page=10&page=${currentPage}&api_key=${apiKey}`
    )
      // the JSON body is taken from the response
      .then((res) => res.json())
      .then((res) => {
        return res as SearchResultType;
      })
  );
}
