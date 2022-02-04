import React from "react";
import logo from "./logo.svg";
import "./App.css";
import SearchPage from "./components/Searchpage";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme/Theme";
import { SearchContextController } from "./contexts/SearchContext";
import { JobListingContextController } from "./contexts/JobListingContext";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <SearchContextController>
          <JobListingContextController>
            <SearchPage />
          </JobListingContextController>
        </SearchContextController>
      </ThemeProvider>
    </div>
  );
}

export default App;
