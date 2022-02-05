import React from "react";
import { Box, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";

const StyledTypography = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.only("xs")]: {
    fontSize: "24px",
  },
}));
interface Props {
  jobListingsNull: boolean;
  noJobsFound: boolean;
  error: boolean;
}
export default function InformationPage({
  jobListingsNull,
  noJobsFound,
  error,
}: Props) {
  if (!jobListingsNull && !noJobsFound && !error) {
    return null;
  }
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      mt={2}
      height="30vh"
    >
      {jobListingsNull && !error && (
        <Box display="flex" alignItems="center">
          <SearchIcon
            fontSize="large"
            sx={{ color: "secondary.main", pr: 2 }}
          />
          <StyledTypography variant="h4" color="secondary.main">
            Search to get started
          </StyledTypography>
        </Box>
      )}
      {noJobsFound && !error && (
        <Box display="flex" alignItems="center">
          <SearchIcon
            fontSize="large"
            sx={{ color: "secondary.main", pr: 2 }}
          />
          <StyledTypography variant="h4" color="secondary.main">
            No jobs found
          </StyledTypography>
        </Box>
      )}

      {error && (
        <Box display="flex" alignItems="center">
          <StyledTypography variant="h4" color="secondary.main">
            Oops, something went wrong :(
          </StyledTypography>
        </Box>
      )}
    </Box>
  );
}
