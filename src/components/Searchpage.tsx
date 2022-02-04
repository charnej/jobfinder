import React from "react";
import { JobListingContextController } from "../contexts/JobListingContext";
import {
  Box,
  Container,
  Grid,
  TextField,
  Toolbar as MuiToolbar,
  Typography,
} from "@mui/material";
import JobListingCard from "./JobListingCard";
import JobListingDetails from "./JobListingDetails";
import SearchBar from "./SearchBar";
import {
  JobListingType,
  SearchContextController,
  useSearchContext,
} from "../contexts/SearchContext";

export default function SearchPage() {
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const {
    jobListings,
    setJobListings,
    searchTerm,
    location,
    radius,
    timePosted,
  } = useSearchContext();
  console.log(jobListings.jobs[0]);
  // React.useEffect(() => {
  //   fetch(`https://api.ziprecruiter.com/jobs/v1?
  //   search=${searchTerm}&location=${location}&radius_miles=${radius}&days_ago=${timePosted}&jobs_per_page=10&page=1&api_key=${apiKey}`)
  //     .then((res) => res.json())
  //     .then(
  //       (result) => {
  //         setIsLoaded(true);
  //         setJobListings(result);
  //       },
  //       (error) => {
  //         setIsLoaded(true);
  //         setError(error);
  //       }
  //     );
  // }, []);
  return (
    <React.Fragment>
      <SearchBar />
      <Container maxWidth="lg">
        <Grid container sx={{ height: "76vh", mt: 2 }}>
          <Grid
            item
            xs={6}
            sx={{
              // backgroundColor: "white",
              height: "100%",
              overflowY: "auto",
            }}
          >
            {jobListings.jobs.map((item) => {
              return (
                <Box mr={1}>
                  <JobListingCard
                    jobId={item.id}
                    jobTitle={item.name}
                    hiringCompanyName={item.hiring_company.name}
                    location={item.location}
                    jobSnippet={item.snippet}
                    timePosted={item.posted_time_friendly}
                    salary={"20000"}
                  />
                </Box>
              );
            })}
          </Grid>

          <Grid
            item
            xs={6}
            sx={{
              backgroundColor: "white",
              height: "100%",
              overflowY: "auto",
              borderRadius: "5px",
            }}
          >
            <Box ml={1} sx={{ backgroundColor: "white" }}>
              <JobListingDetails />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
