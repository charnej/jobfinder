import { render } from "@testing-library/react";
import React from "react";
import { fetchJobs3, fetchJobs4 } from "./FetchJobs";

test("the data is peanut butter", () => {
  return fetchJobs4(
    "teacher",
    "asasas",
    5,
    1,
    1,
    "mthpyw9ea7zyswfuj3zur6bt55fce7qf"
  ).then((data) => {
    expect(data.total_jobs).toBe(0);
  });
});

test("the fetch fails with an error", () => {
  return fetchJobs4("teacher", "new york", 5, 1, 1, "").catch((e) =>
    expect(e).toMatch("error")
  );
});
