import { JobListingType, SearchResultType } from "../contexts/SearchContext";

export const jobs: JobListingType[] = [
  {
    buyer_type: "subs_fulfillment",
    category: "Customer Service",
    city: "Cheyenne",
    country: "US",
    has_zipapply: true,
    hiring_company: {
      id: null,
      name: "Asset Protection Direct",
      description: null,
      url: null,
    },
    id: "ziprecruiterpremiumpropaid_cpcf2de69bd-e2425ea4",
    industry_name: "Business",
    job_age: 0,
    location: "Cheyenne, WY, USA",
    name: "Email Chat Representative & Call Center Support",
    posted_time: "2022-02-06T06:51:23Z",
    posted_time_friendly: "just now",
    salary_interval: "yearly",
    salary_max: 36040,
    salary_max_annual: 36040,
    salary_min: 26702,
    salary_min_annual: 26702,
    salary_source: "provided",
    snippet:
      "Asset Protection Direct is seeking an Email Chat Representative &amp; Call Center Support to join our team! You will be responsible for helping customers by providing product and service information and&nbsp;...",
    source: "ZipRecruiter",
    state: "WY",
    url: "https://www.ziprecruiter.com/k/tl/AAK1_uuI88ow_hp64lDdW5hFHuZ4BmRFD4X0NcOfAP77EJLEpp9mi_u_vebUpxys6ZAB9b8w3yQqfQu4pfs3U96joJSSrpggX53uV3LmnojsA-VvJnt5UsD5NehRK0yoUcyNbEw2zVmYl4zG-qJKNizXH9MckvyWjYzkY3gJCKbwuCD_",
  },
];

export const fakeData: SearchResultType = {
  num_paginable_jobs: 500,
  success: true,
  total_jobs: 123548,
  jobs: jobs,
};

export const emptyJobsMockData: SearchResultType = {
  num_paginable_jobs: 0,
  success: true,
  total_jobs: 0,
  jobs: [],
};
