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
import { radiusOptions, timePostedOptions } from "../helpers/helperData";

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
    setCurrentPage,
  } = useSearchContext();

  const { setSelectedJobListing } = useJobListingContext();
  const isMobile = window.innerWidth >= 320 && window.innerWidth <= 480;

  const getJobs = async (
    searchTerm: string,
    location: string,
    radius: number,
    timePosted: number,
    currentPage: number
  ) => {
    setCurrentPage(1);

    setIsLoading(true);
    setError(false);
    try {
      const response = await fetchJobs(
        searchTerm,
        location,
        radius,
        timePosted,
        currentPage
      );
      if (response) {
        if (!response.success) {
          setError(true);
        }
        if (response.jobs.length > 0 && !isMobile) {
          setSelectedJobListing(response.jobs[0].id);
        }
        setJobListings(response);
      }
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

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
              style={{ width: isMobile ? "70%" : "100%", height: "auto" }}
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
                    sx={{
                      color: "common.white",
                      textTransform: "capitalize",
                    }}
                    onClick={async () => {
                      getJobs(searchTerm, location, radius, timePosted, 1);
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
                  getJobs(
                    searchTerm,
                    location,
                    radius,
                    parseInt(e.target.value),
                    1
                  );
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
                  getJobs(
                    searchTerm,
                    location,
                    parseInt(e.target.value),
                    timePosted,
                    1
                  );
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
