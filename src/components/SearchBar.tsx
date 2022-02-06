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
import { fetchJobs } from "../helpers/FetchJobs";

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
                  id="Search"
                  name="Search"
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

                      setIsLoading(true);
                      try {
                        const response = await fetchJobs(
                          searchTerm,
                          location,
                          radius,
                          timePosted,
                          currentPage
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
                id="datePostedSelectTextField"
                select
                variant="standard"
                placeholder="Date posted"
                InputProps={{
                  disableUnderline: true,
                }}
                inputProps={{
                  id: "datePostedSelectInput",
                }}
                onChange={async (e) => {
                  setTimePosted(parseInt(e.target.value));
                  setCurrentPage(1);
                  setIsLoading(true);
                  try {
                    const response = await fetchJobs(
                      searchTerm,
                      location,
                      radius,
                      parseInt(e.target.value),
                      currentPage
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
                id="radiusSelectTextField"
                select
                variant="standard"
                placeholder="within 5 miles"
                InputProps={{
                  disableUnderline: true,
                }}
                inputProps={{
                  id: "radiusSelectInput",
                }}
                onChange={async (e) => {
                  setRadius(parseInt(e.target.value));
                  setCurrentPage(1);

                  setIsLoading(true);
                  try {
                    const response = await fetchJobs(
                      searchTerm,
                      location,
                      parseInt(e.target.value),
                      timePosted,
                      currentPage
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
          </Grid>
        </Box>
      </Container>
    </>
  );
}
