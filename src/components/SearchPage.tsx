import React from "react";
import {
  Box,
  CircularProgress,
  Container,
  Drawer,
  Grid,
  IconButton,
  Pagination,
} from "@mui/material";
import JobListingCard from "./JobListingCard";
import JobListingDetails from "./JobListingDetails";
import SearchBar from "./SearchBar";
import { useSearchContext } from "../contexts/SearchContext";
import InformationPage from "./InformationPage";
import { useWindowSize } from "../hooks/useWindowSize";
import { fetchJobs } from "../helpers/FetchJobs";
import { useJobListingContext } from "../contexts/JobListingContext";
import CloseIcon from "@mui/icons-material/Close";

export default function SearchPage() {
  const { height } = useWindowSize();
  const isMobile = window.innerWidth >= 320 && window.innerWidth <= 480;
  const {
    jobListings,
    isLoading,
    error,
    setCurrentPage,
    searchTerm,
    timePosted,
    location,
    radius,
    setIsLoading,
    setError,
    setJobListings,
    currentPage,
  } = useSearchContext();

  const {
    openJobListingDetails,
    setOpenJobListingDetails,
    setSelectedJobListing,
  } = useJobListingContext();

  const [splitControlHeight, setSplitControlHeight] = React.useState(0);
  const splitControlHeightRef: React.MutableRefObject<HTMLElement | null> =
    React.useRef<HTMLDivElement>(null);

  const handlePageChange = async (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
    setIsLoading(true);
    try {
      const response = await fetchJobs(
        searchTerm,
        location,
        radius,
        timePosted,
        value
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
    <Box height="100vh" overflow="hidden">
      <div
        ref={(node: HTMLElement | null) => {
          if (splitControlHeightRef) {
            splitControlHeightRef.current = node;
            if (splitControlHeightRef.current) {
              setSplitControlHeight(
                splitControlHeightRef?.current.clientHeight
              );
            }
          }
        }}
      >
        <SearchBar />
      </div>
      <Container
        maxWidth="lg"
        sx={{
          height: (height ?? 0) - splitControlHeight - 75,
        }}
      >
        {isLoading && (
          <Box
            data-testid="loadingSpinner"
            id="loadingSpinner"
            mt={2}
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
            error={error}
          />
        )}

        {!isLoading && !error && jobListings && jobListings.total_jobs > 0 && (
          <>
            <Grid
              container
              sx={{
                height: (height ?? 0) - splitControlHeight - 120,
                mt: 2,
              }}
            >
              <Grid
                item
                xs={isMobile ? 12 : 6}
                sx={{
                  height: "100%",
                  overflowY: "auto",
                }}
              >
                {jobListings?.jobs.map((item) => {
                  const salary =
                    item.salary_interval && item.salary_max && item.salary_min
                      ? item.salary_max === item.salary_min
                        ? `$${item.salary_min.toFixed(2)} ${
                            item.salary_interval
                          }`
                        : `$${item.salary_min.toFixed(
                            1
                          )} - $${item.salary_max.toFixed(2)} ${
                            item.salary_interval
                          }`
                      : null;
                  return (
                    <Box mr={1} key={item.id} data-testid="jobListingCard">
                      <JobListingCard
                        jobId={item.id}
                        jobTitle={item.name}
                        hiringCompanyName={item.hiring_company.name}
                        location={item.location}
                        jobSnippet={item.snippet}
                        timePosted={item.posted_time_friendly}
                        salary={salary}
                        isMobile={isMobile}
                      />
                    </Box>
                  );
                })}
              </Grid>
              {isMobile ? (
                <Drawer
                  open={openJobListingDetails}
                  onClose={() => {
                    setOpenJobListingDetails(false);
                    setSelectedJobListing(null);
                  }}
                >
                  <Box position="absolute" right="16px" top="12px">
                    <IconButton
                      onClick={() => {
                        setOpenJobListingDetails(false);
                        setSelectedJobListing(null);
                      }}
                    >
                      <CloseIcon color="secondary" />
                    </IconButton>
                  </Box>
                  <Box ml={1} sx={{ backgroundColor: "white" }}>
                    <JobListingDetails />
                  </Box>
                </Drawer>
              ) : (
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
              )}
            </Grid>

            <Box
              pt={1}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Pagination
                count={Math.ceil(jobListings.num_paginable_jobs / 10)}
                color="primary"
                page={currentPage}
                onChange={handlePageChange}
              />
            </Box>
          </>
        )}
      </Container>
      <Box display="flex" justifyContent="flex-end" pb={2} pr={2}>
        <a
          href="https://www.ziprecruiter.com/jobs"
          id="jobs_widget_link"
          style={{
            color: "#11255D",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span>Job Search by</span>{" "}
          <span id="zr_logo_container">
            <img
              id="zr_logo"
              src="https://www.ziprecruiter.com/img/logos/logo-sm-black-304px.png"
              alt="ZipRecruiter"
              width="120"
            />
          </span>
        </a>
      </Box>
    </Box>
  );
}
