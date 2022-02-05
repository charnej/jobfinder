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
        setIsLoading(false);
        setError(error);
      }
    );
};

// export function fetchJobs4(
//   searchTerm: string,
//   location: string,
//   radius: number,
//   timePosted: number,
//   currentPage: number,
//   apiKey: string
// ): Promise<SearchResultType> {
//   // For now, consider the data is stored on a static `users.json` file
//   return (
//     fetch(
//       `https://api.ziprecruiter.com/jobs/v1?search=${searchTerm}&location=${location}&radius_miles=${radius}&days_ago=${timePosted}&jobs_per_page=10&page=${currentPage}&api_key=${apiKey}`
//     )
//       // the JSON body is taken from the response
//       .then((res) => res.json())
//       .then((res) => {
//         return res as SearchResultType;
//       })
//   );
// }

export async function fetchJobs4(
  searchTerm: string,
  location: string,
  radius: number,
  timePosted: number,
  currentPage: number,
  apiKey: string
): Promise<SearchResultType> {
  // For now, consider the data is stored on a static `users.json` file
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
