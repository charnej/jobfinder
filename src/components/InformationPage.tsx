import { Box, Typography } from "@mui/material";
import React from "react";
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
}
export default function InformationPage({
  jobListingsNull,
  noJobsFound,
}: Props) {
  if (!jobListingsNull && !noJobsFound) {
    return null;
  }
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      mt={2}
      height="30vh"
      //   sx={{ backgroundColor: "pink" }}
    >
      {jobListingsNull && (
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
      {noJobsFound && (
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
    </Box>
  );
}
