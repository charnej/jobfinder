import React from "react";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Toolbar as MuiToolbar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import logo from "../assests/JobFinder.png";
import { StyledTextField } from "./TextFields";
const Toolbar = styled(MuiToolbar)(({ theme }) => ({
  alignItems: "flex-start",
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
}));

export default function SearchBar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "white" }}>
      <Grid container sx={{ p: 1, display: "flex", alignItems: "center" }}>
        <Grid item xs={1}>
          <img
            src={logo}
            alt="job finder logo"
            style={{ width: "100%", height: "auto" }}
          />
        </Grid>
        <Grid item xs={11}>
          <Box pl={8} display="flex" alignItems="center">
            <StyledTextField fullWidth variant="filled" placeholder="Search" />
            <TextField fullWidth variant="filled" placeholder="location" />
            <Box pl={2}>
              <Button variant="contained">Find jobs</Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ backgroundColor: "black" }} />
      <Grid
        container
        sx={{ p: 1, display: "flex", justifyContent: "flex-start" }}
      >
        <Grid item xs={1}></Grid>
        <Grid item xs={11}>
          <Box pl={8} display="flex" alignItems="center">
            <TextField variant="filled" placeholder="Posted time" />
            <TextField variant="filled" placeholder="within 5 km" />
            <TextField variant="filled" placeholder="job type" />
          </Box>
        </Grid>
      </Grid>
    </AppBar>
  );
}
