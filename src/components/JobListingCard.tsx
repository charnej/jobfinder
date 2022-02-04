import React from "react";
import { Paper, Typography } from "@mui/material";
import { useJobListingContext } from "../contexts/JobListingContext";
import { Box } from "@mui/system";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";

interface Props {
  jobId: string;
  jobTitle: string;
  hiringCompanyName: string;
  location: string;
  jobSnippet: string;
  timePosted: string;
  salary: string | null;
}
export default function JobListingCard({
  jobId,
  jobTitle,
  hiringCompanyName,
  location,
  jobSnippet,
  timePosted,
  salary,
}: Props) {
  const { setSelectedJobListing, selectedJobListing } = useJobListingContext();
  return (
    <Paper
      elevation={3}
      sx={{
        mb: 1,
        padding: 2,
        cursor: "pointer",
        border: jobId === selectedJobListing ? "2px solid #2CCA9A" : "none",
        borderRadius: "5px",
      }}
      onClick={() => {
        setSelectedJobListing(jobId);
      }}
    >
      <Box display="flex" flexDirection="column" justifyContent="flex-start">
        <Typography variant="h5" align="left" fontWeight="bold">
          {jobTitle}
        </Typography>
        <Typography align="left">{hiringCompanyName}</Typography>
        {salary && (
          <Box>
            <Typography
              align="left"
              variant="subtitle2"
              sx={{ color: "#2CCA9A", fontWeight: "bold" }}
            >
              {salary}
            </Typography>
          </Box>
        )}
      </Box>

      <Box pt={1}>
        <Typography align="left">{location}</Typography>
        <Typography align="left">{jobSnippet}</Typography>
      </Box>
      <Box pt={1} display="flex" alignItems="center">
        <AccessTimeFilledIcon fontSize="small" sx={{ color: "#458EF5" }} />
        <Typography
          sx={{ color: "#458EF5", pl: 1 }}
          align="left"
          variant="subtitle2"
        >
          posted {timePosted}
        </Typography>
      </Box>
    </Paper>
  );
}
