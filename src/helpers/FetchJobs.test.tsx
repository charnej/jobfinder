import React from "react";
import { fetchJobs3 } from "./FetchJobs";

it("should get jobs listings based on given criteria", () => {
  const result = fetchJobs3(
    "teacher",
    "new york",
    5,
    1,
    1,
    "",
    () => {},
    () => {},
    () => {}
  );
});
