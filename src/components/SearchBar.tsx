import React from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  TextField,
  Toolbar as MuiToolbar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import logo from "../assests/JobFinder.png";
import { useSearchContext } from "../contexts/SearchContext";

export default function SearchBar() {
  const {
    jobListings,
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
  } = useSearchContext();

  const apiKey = "mthpyw9ea7zyswfuj3zur6bt55fce7qf";

  const fetchJobs = React.useCallback(() => {
    setIsLoading(true);
    fetch(`https://api.ziprecruiter.com/jobs/v1?
    search=${searchTerm}&location=${location}&radius_miles=${radius}&days_ago=${timePosted}&jobs_per_page=10&page=1&api_key=${apiKey}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoading(false);
          setJobListings(result);
        },
        (error) => {
          console.log("error");
          setIsLoading(false);
          // setError(error);
        }
      );
  }, [searchTerm, location, radius, timePosted]);

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
                    sx={{ color: "common.white", textTransform: "capitalize" }}
                    onClick={() => {
                      fetchJobs();
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
                variant="standard"
                placeholder="Posted time"
                InputProps={{
                  disableUnderline: true,
                }}
                onChange={(e) => {
                  setTimePosted(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                variant="standard"
                placeholder="within 5 km"
                InputProps={{
                  disableUnderline: true,
                }}
                onChange={(e) => {
                  setRadius(parseInt(e.target.value));
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                placeholder="job type"
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
