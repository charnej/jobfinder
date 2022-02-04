import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
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
  const { setSelectedJobListing } = useJobListingContext();
  return (
    // <Card
    //   sx={{ margin: 1 }}
    //   onClick={() => {
    //     setSelectedJobListing(jobId);
    //   }}
    // >
    //   <CardHeader
    //     title={jobTitle}
    //     subheader={hiringCompanyName}
    //     sx={{ textAlign: "center" }}
    //   />
    //   <CardContent>
    //     <Typography>{location}</Typography>
    //     <Typography>{jobSnippet}</Typography>
    //     <Typography>{timePosted}</Typography>
    //   </CardContent>
    // </Card>
    <Paper elevation={3} sx={{ margin: 1, padding: 2 }}>
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
