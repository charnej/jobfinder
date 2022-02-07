import { act, fireEvent, render, screen } from "@testing-library/react";
import SearchBar from "./SearchBar";
import * as data from "./../helpers/FetchJobs";
import { mockedSearchResults } from "../helpers/helperData";

describe("renders inputs", () => {
  it("updates on change: search input", () => {
    render(<SearchBar />);

    const field = screen.getByTestId("searchTerm").querySelector("input");
    expect(field).toBeInTheDocument();
    if (field) {
      fireEvent.change(field, { target: { value: "google it" } });
      expect(field.value).toBe("google it");
    }
  });

  it("updates on change: location input", () => {
    render(<SearchBar />);

    const field = screen.getByTestId("location").querySelector("input");
    expect(field).toBeInTheDocument();
    if (field) {
      fireEvent.change(field, { target: { value: "google it" } });
      expect(field.value).toBe("google it");
    }
  });

  it("opens date posted select, and selects second value", () => {
    const { getAllByRole, getByRole, container } = render(<SearchBar />);

    // checks if the textfield div exists
    let datePostedSelectTextField = container.querySelector(
      "#datePostedSelectTextField"
    ) as HTMLDivElement;
    expect(datePostedSelectTextField).toBeInTheDocument();

    // checks if the input of the select exists, and if the value is 0 (default value)
    let datePostedSelectInput = container.querySelector(
      "#datePostedSelectInput"
    ) as HTMLInputElement;
    expect(datePostedSelectInput).toBeInTheDocument();
    expect(datePostedSelectInput.value).toEqual("0");

    // opens the select
    fireEvent.mouseDown(datePostedSelectTextField);

    // checks if there are options available
    expect(getByRole("listbox")).not.toEqual(null);

    // gets all the options, and selects the second one
    act(() => {
      const options = getAllByRole("option");
      fireEvent.mouseDown(options[1]);
      options[1].click();
    });

    // checks if the value is the selected option
    datePostedSelectInput = container.querySelector(
      "#datePostedSelectInput"
    ) as HTMLInputElement;
    expect(datePostedSelectInput.value).toEqual("1");
  });

  it("opens radius select, and selects second value", () => {
    const { getAllByRole, getByRole, container } = render(<SearchBar />);

    // checks if the textfield div exists
    let radiusSelectTextField = container.querySelector(
      "#radiusSelectTextField"
    ) as HTMLDivElement;
    expect(radiusSelectTextField).toBeInTheDocument();

    // checks if the input of the select exists, and if the value is 5 (default value)
    let radiusSelectInput = container.querySelector(
      "#radiusSelectInput"
    ) as HTMLInputElement;
    expect(radiusSelectInput).toBeInTheDocument();
    expect(radiusSelectInput.value).toEqual("5");

    // opens the select
    fireEvent.mouseDown(radiusSelectTextField);

    // checks if there are options available
    expect(getByRole("listbox")).not.toEqual(null);

    // gets all the options, and selects the second one
    act(() => {
      const options = getAllByRole("option");
      fireEvent.mouseDown(options[1]);
      options[1].click();
    });

    // checks if the value is the selected option
    radiusSelectInput = container.querySelector(
      "#radiusSelectInput"
    ) as HTMLInputElement;
    expect(radiusSelectInput.value).toEqual("10");
  });
});

describe("find jobs button", () => {
  it("clicks the search button and calls FetchJobs once", () => {
    render(<SearchBar />);
    const mock = jest
      .spyOn(data, "fetchJobs")
      .mockResolvedValue(mockedSearchResults);

    const findJobsButton = screen.getByTestId("findJobsButton");

    fireEvent.click(findJobsButton);

    expect(mock).toHaveBeenCalledTimes(1);
  });
});
