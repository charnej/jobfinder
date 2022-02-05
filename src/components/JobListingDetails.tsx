import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";
import { useJobListingContext } from "../contexts/JobListingContext";
import { useSearchContext } from "../contexts/SearchContext";
import parse from "html-react-parser";

export default function JobListingDetails() {
  const { selectedJobListing } = useJobListingContext();
  const { jobListings } = useSearchContext();
  const job = React.useMemo(() => {
    return jobListings?.jobs.find((job) => job.id === selectedJobListing);
  }, [selectedJobListing, jobListings]);
  if (!selectedJobListing) {
    return null;
  }
  return (
    <Box>
      <Box m={1}>
        <Box p={1} sx={{ backgroundColor: "white" }}>
          <Typography align="left" variant="h6">
            {job?.hiring_company.name}
          </Typography>
          <Typography align="left" variant="h4" fontWeight="bold">
            {job?.name}
          </Typography>
          <Typography align="left" variant="subtitle2">
            {job?.location}
          </Typography>
          {job?.salary_interval && job.salary_min && job.salary_max && (
            <Typography
              variant="subtitle2"
              align="left"
              color="primary.main"
              fontWeight="bold"
            >
              {job.salary_min === job.salary_max
                ? `$${job.salary_min.toFixed(2)} ${job.salary_interval}`
                : `$${job.salary_min.toFixed(2)} - $${job.salary_max.toFixed(
                    2
                  )} ${job.salary_interval}`}
            </Typography>
          )}
        </Box>
        <Divider />
        <Box p={1}>
          <Typography align="left">About this job</Typography>
          <Typography align="left">{parse(job?.snippet ?? "")}</Typography>
        </Box>
        <Box pt={2} display="flex">
          <Button
            variant="contained"
            sx={{ color: "common.white", textTransform: "capitalize" }}
            onClick={() => {
              window.open(job?.url, "_blank");
            }}
          >
            Read more
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
