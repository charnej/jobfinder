import { Box, Divider, Typography } from "@mui/material";
import React from "react";

export default function JobListingDetails() {
  return (
    <div>
      <Box m={1}>
        <Box p={1} sx={{ backgroundColor: "white" }}>
          <Typography>Company</Typography>
          <Typography>Job title</Typography>
          <Typography>Location</Typography>
          <Typography>Salary range</Typography>
        </Box>
        <Divider />
        <Box p={1}>
          <Typography>description/snippet</Typography>
        </Box>
      </Box>
    </div>
  );
}
