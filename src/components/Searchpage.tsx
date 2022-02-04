import React from "react";
import { JobListingContextController } from "../contexts/JobListingContext";
import {
  Box,
  Grid,
  TextField,
  Toolbar as MuiToolbar,
  Typography,
} from "@mui/material";
import JobListingCard from "./JobListingCard";
import JobListingDetails from "./JobListingDetails";
import SearchBar from "./SearchBar";

interface SalaryType {
  salaryInterval: string | null;
  salaryMax: number | null;
  salaryMin: number | null;
  salaryMaxAnnual: number | null;
  salaryMinAnnual: number | null;
}
interface HiringCompanyType {
  id: string | null;
  name: string;
  url: string | null;
  description: string | null;
}
interface JobListingType {
  id: string;
  // job title
  name: string;
  snippet: string;
  location: string;
  friendlyTimePosted: string;
  timePosted: string;
  salary: SalaryType;
  hiringCompany: HiringCompanyType;
  url: string;
}
export default function SearchPage() {
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [items, setItems] = React.useState<JobListingType[]>([]);
  const zip = 99950;
  // React.useEffect(() => {
  //   fetch(`http://ctp-zip-api.herokuapp.com/zip/${zip}`)
  //     .then((res) => res.json())
  //     .then(
  //       (result) => {
  //         setIsLoaded(true);
  //         setItems(result);
  //       },
  //       (error) => {
  //         setIsLoaded(true);
  //         setError(error);
  //       }
  //     );
  // }, []);

  const apiKey = "mthpyw9ea7zyswfuj3zur6bt55fce7qf";
  const searchTerm = "teacher";
  const location = "";
  const radius = 22;
  const daysAgo = 100;

  const jobs: JobListingType[] = [
    {
      id: "1",
      friendlyTimePosted: "1 day ago",
      hiringCompany: {
        id: "hc1",
        name: "Hiring comopany name",
        description: null,
        url: null,
      },
      location: "New York City, NY, USA",
      salary: {
        salaryInterval: null,
        salaryMax: null,
        salaryMaxAnnual: null,
        salaryMin: null,
        salaryMinAnnual: null,
      },
      name: "softwaredv",
      snippet: "sdfkjhsdj dsjhdfksajd shdjkjasd",
      timePosted: "2022-02-04T06:41:02Z",
      url: "https://www.ziprecruiter.com/ek/tl/AALM9PRHJSpYe1Ie43YiBuBlU_esAa0ErteniEcphw9I9ZPe5CocsqST46SouU1AQ2qkJfkhOXYjE08sFaFzcxqFZHZbE5l7Xce3WUnPoKZM7C_uKdIhslYsH0zUWjEnMz5J1npKfyVJlWB_qofeYEXMm7pnjCrsbtvpknLWdwEbvbP4",
    },
    {
      id: "2",
      friendlyTimePosted: "2 day ago",
      hiringCompany: {
        id: "hc2",
        name: "Hiring comopany name 2",
        description: null,
        url: null,
      },
      location: "New York City, NY, USA",
      salary: {
        salaryInterval: null,
        salaryMax: null,
        salaryMaxAnnual: null,
        salaryMin: null,
        salaryMinAnnual: null,
      },
      name: "software dsv",
      snippet: "sdfkjhsdj sdsd dsjhdfksajd shdjkjasd",
      timePosted: "2022-02-04T06:41:02Z",
      url: "https://www.ziprecruiter.com/ek/tl/AALM9PRHJSpYe1Ie43YiBuBlU_esAa0ErteniEcphw9I9ZPe5CocsqST46SouU1AQ2qkJfkhOXYjE08sFaFzcxqFZHZbE5l7Xce3WUnPoKZM7C_uKdIhslYsH0zUWjEnMz5J1npKfyVJlWB_qofeYEXMm7pnjCrsbtvpknLWdwEbvbP4",
    },
  ];
  return (
    <JobListingContextController>
      <React.Fragment>
        <SearchBar />
        <Box m={2}>
          <Grid container sx={{ height: "76vh", mt: 2 }}>
            <Grid
              item
              xs={6}
              sx={{
                // backgroundColor: "white",
                height: "100%",
                overflowY: "auto",
              }}
            >
              {jobs.map((item) => {
                return (
                  <Box mr={1}>
                    <JobListingCard
                      jobId={item.id}
                      jobTitle={item.name}
                      hiringCompanyName={item.hiringCompany.name}
                      location={item.location}
                      jobSnippet={item.snippet}
                      timePosted={item.friendlyTimePosted}
                      salary={"20000"}
                    />
                  </Box>
                );
              })}
            </Grid>

            <Grid
              item
              xs={6}
              sx={{
                // backgroundColor: "white",
                height: "100%",
                overflowY: "auto",
              }}
            >
              <Box ml={1} sx={{ backgroundColor: "white" }}>
                <JobListingDetails />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </React.Fragment>
    </JobListingContextController>
  );
}
