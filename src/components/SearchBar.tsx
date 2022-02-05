import React from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import logo from "../assets/JobFinder.png";
import { useSearchContext } from "../contexts/SearchContext";
import { useJobListingContext } from "../contexts/JobListingContext";
import { fetchJobs3, fetchJobs4 } from "../helpers/FetchJobs";

const timePostedOptions = [
  {
    value: 0,
    name: "Posted anytime",
  },
  {
    value: 1,
    name: "Last 24 hours",
  },
  {
    value: 3,
    name: "Last 3 days",
  },
  {
    value: 7,
    name: "Last 7 days",
  },
  {
    value: 14,
    name: "Last 14 days",
  },
  {
    value: 30,
    name: "Last month",
  },
];

const radiusOptions = [
  {
    value: 5,
    name: "Within 5 miles",
  },
  {
    value: 10,
    name: "Within 10 miles",
  },
  {
    value: 15,
    name: "Within 15 miles",
  },
  {
    value: 20,
    name: "Within 20 miles",
  },
  {
    value: 25,
    name: "Within 25 miles",
  },
  {
    value: 50,
    name: "Within 50 miles",
  },
  {
    value: 100,
    name: "Within 100 miles",
  },
];

export default function SearchBar() {
  const {
    setJobListings,
    searchTerm,
    setSearchTerm,
    location,
    setLocation,
    radius,
    setRadius,
    timePosted,
    setTimePosted,
    setIsLoading,
    setError,
    currentPage,
    setCurrentPage,
  } = useSearchContext();

  const { setSelectedJobListing } = useJobListingContext();

  const apiKey = "mthpyw9ea7zyswfuj3zur6bt55fce7qf";

  // const fetchJobs = React.useCallback(() => {
  //   setIsLoading(true);
  //   setError(false);
  //   fetch(
  //     `https://api.ziprecruiter.com/jobs/v1?search=${searchTerm}&location=${location}&radius_miles=${radius}&days_ago=${timePosted}&jobs_per_page=10&page=${currentPage}&api_key=${apiKey}`
  //   )
  //     .then((res) => res.json())
  //     .then(
  //       (result) => {
  //         setIsLoading(false);
  //         setJobListings(result);
  //       },
  //       (error) => {
  //         console.log("error");
  //         setIsLoading(false);
  //         setError(error);
  //       }
  //     );
  // }, [searchTerm, location, radius, timePosted]);

  // React.useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await fetchJobs4(
  //         searchTerm,
  //         location,
  //         radius,
  //         timePosted,
  //         currentPage,
  //         apiKey
  //       );
  //       console.log(response);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   }
  //   fetchData();
  // }, [searchTerm, location, radius, timePosted, currentPage, apiKey]);

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "white" }}>
        <Grid
          container
          spacing={2}
          sx={{ p: 1, display: "flex", alignItems: "center" }}
        >
          <Grid item xs={12} md={2} lg={2}>
            <img
              src={logo}
              alt="job finder logo"
              style={{ width: "100%", height: "auto" }}
            />
          </Grid>
          <Grid item xs={12} md={10} lg={10}>
            <Box mx={5} display="flex" alignItems="center" flexWrap="wrap">
              <Grid item xs={12} md={4}>
                <TextField
                  data-testid="searchTerm"
                  fullWidth
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                  }}
                  placeholder="Search"
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  data-testid="location"
                  fullWidth
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                  }}
                  placeholder="location"
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Box pl={2}>
                  <Button
                    variant="contained"
                    data-testid="findJobsButton"
                    sx={{ color: "common.white", textTransform: "capitalize" }}
                    onClick={async () => {
                      setSelectedJobListing(null);
                      setCurrentPage(1);
                      // fetchJobs3(
                      //   searchTerm,
                      //   location,
                      //   radius,
                      //   timePosted,
                      //   currentPage,
                      //   apiKey,
                      //   setIsLoading,
                      //   setError,
                      //   setJobListings
                      // );
                      setIsLoading(true);
                      try {
                        const response = await fetchJobs4(
                          searchTerm,
                          location,
                          radius,
                          timePosted,
                          currentPage,
                          apiKey
                        );
                        if (response) {
                          setJobListings(response);
                        }
                      } catch (error) {
                        setError(true);
                      } finally {
                        setIsLoading(false);
                      }
                    }}
                  >
                    Find jobs
                  </Button>
                </Box>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box>
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "common.white",
              borderRadius: "5px",
            }}
          >
            <Grid item xs={12} md={4}>
              <TextField
                data-testid="datePosted"
                select
                variant="standard"
                placeholder="Date posted"
                InputProps={{
                  disableUnderline: true,
                }}
                onChange={async (e) => {
                  setTimePosted(parseInt(e.target.value));
                  // fetchJobs();
                  setCurrentPage(1);
                  // fetchJobs3(
                  //   searchTerm,
                  //   location,
                  //   radius,
                  //   parseInt(e.target.value),
                  //   currentPage,
                  //   apiKey,
                  //   setIsLoading,
                  //   setError,
                  //   setJobListings
                  // );
                  // fetchJobs2();
                  setIsLoading(true);
                  try {
                    const response = await fetchJobs4(
                      searchTerm,
                      location,
                      radius,
                      timePosted,
                      currentPage,
                      apiKey
                    );
                    if (response) {
                      setJobListings(response);
                    }
                  } catch (error) {
                    setError(true);
                  } finally {
                    setIsLoading(false);
                  }
                }}
                defaultValue={0}
              >
                {timePostedOptions.map((option) => {
                  return (
                    <MenuItem key={option.value} value={option.value}>
                      {option.name}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                data-testid="radius"
                select
                variant="standard"
                placeholder="within 5 miles"
                InputProps={{
                  disableUnderline: true,
                }}
                onChange={(e) => {
                  setRadius(parseInt(e.target.value));
                  setCurrentPage(1);
                  fetchJobs3(
                    searchTerm,
                    location,
                    parseInt(e.target.value),
                    timePosted,
                    currentPage,
                    apiKey,
                    setIsLoading,
                    setError,
                    setJobListings
                  );
                  // fetchJobs();
                  // fetchJobs2();
                }}
                defaultValue={5}
              >
                {radiusOptions.map((option) => {
                  return (
                    <MenuItem key={option.value} value={option.value}>
                      {option.name}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Grid>
            {/* <Grid item xs={12} md={4}>
              <TextField
                placeholder="job type"
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </Grid> */}
          </Grid>
        </Box>
      </Container>
    </>
  );
}
