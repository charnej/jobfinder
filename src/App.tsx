import React from "react";
import "./App.css";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme/Theme";
import { SearchContextController } from "./contexts/SearchContext";
import { JobListingContextController } from "./contexts/JobListingContext";
import SearchPage from "./components/SearchPage";

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
