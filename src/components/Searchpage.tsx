import React from "react";
import { JobListingContextController } from "../contexts/JobListingContext";
import {
  Box,
  CircularProgress,
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
import InformationPage from "./InformationPage";

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
    isLoading,
  } = useSearchContext();
  console.log(isLoading);
  // if (isLoading) {
  //   return <CircularProgress />;
  // }
  return (
    <React.Fragment>
      <SearchBar />
      <Container maxWidth="lg">
        {isLoading && (
          <Box
            mt={2}
            height="30vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <CircularProgress />
          </Box>
        )}

        {!isLoading && (
          <InformationPage
            jobListingsNull={jobListings ? false : true}
            noJobsFound={jobListings?.total_jobs === 0 ? true : false}
          />
        )}

        {!isLoading && jobListings && jobListings.total_jobs > 0 && (
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
              {jobListings?.jobs.map((item) => {
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
        )}
      </Container>
    </React.Fragment>
  );
}
