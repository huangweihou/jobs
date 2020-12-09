import React, { useState, useEffect } from "react";
import { fetchAllJobUrl } from "../../constants/constants";
import "./FilterBox.css";

const FilterBox = (props) => {
  const {
    setAllJob,
    jobTitle,
    setJobTitle,
    location,
    setLocation,
    jobType,
    setJobType,
    salaryMin,
    setSalaryMin,
    salaryMax,
    setSalaryMax,
  } = props;

  const filterSearch = () => {
    let finalQuery = "";
    let jobTitleQuery = "";
    let locationQuery = "";
    let jobTypeQuery = "";
    let salaryMinQuery = "";
    let salaryMaxQuery = "";
    let baseUrl = fetchAllJobUrl + "?";
    if (jobTitle) {
      jobTitleQuery = `&jobTitle=${jobTitle}`;
    }
    if (location) {
      locationQuery = `&location=${location}`;
    }
    if (jobType.includes(true)) {
      if (jobType[0]) {
        jobTypeQuery += `&jobType="full-time"`;
      }
      if (jobType[1]) {
        jobTypeQuery += `&jobType="part-time"`;
      }
      if (jobType[2]) {
        jobTypeQuery += `&jobType="intern"`;
      }
    }
    if (salaryMin) {
      salaryMinQuery = `&salaryMin=${salaryMin}`;
    }
    if (salaryMax) {
      salaryMaxQuery = `&salaryMax=${salaryMax}`;
    }

    finalQuery =
      baseUrl +
      jobTitleQuery +
      locationQuery +
      jobTypeQuery +
      salaryMinQuery +
      salaryMaxQuery;

    if (finalQuery.length > baseUrl.length) {
      finalQuery =
        finalQuery.slice(0, baseUrl.length) +
        finalQuery.slice(baseUrl.length + 1);
    }

    console.log("finalQuery", finalQuery);

    return finalQuery;
  };

  const filterFetch = async () => {
    const filterJobData = await fetch(filterSearch()).then((res) => res.json());
    console.log("filterJobData", filterJobData);
    // if (Array.isArray(filterJobData)) {
    //   setAllJob(filterJobData);
    // }
    setAllJob(filterJobData);
  };

  useEffect(() => {
    console.log("jobTitle", jobTitle);
  }, [jobTitle]);

  useEffect(() => {
    console.log("location", location);
  }, [location]);

  useEffect(() => {
    console.log("jobType", jobType);
  }, [jobType]);

  useEffect(() => {
    console.log("min", salaryMin);
  }, [salaryMin]);

  useEffect(() => {
    console.log("max", salaryMax);
  }, [salaryMax]);

  return (
    <div>
      <div className="job-search-container">
        <div>
          <input
            className="job-title-input-box"
            type="text"
            placeholder="Search Job Title"
            onChange={(e) => {
              setJobTitle(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="filter-box-container">
        <div className="location-input">
          <div>Location: </div>
          <input
            type="text"
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          />
        </div>
        <div className="job-input">
          <div>Job type: </div>
          <div className="job-type-input">
            <div>
              <input
                type="checkbox"
                onChange={() =>
                  setJobType([!jobType[0], jobType[1], jobType[2]])
                }
              />
              <label>full-time</label>
            </div>
            <div>
              <input
                type="checkbox"
                onChange={() =>
                  setJobType([jobType[0], !jobType[1], jobType[2]])
                }
              />
              <label>part-time</label>
            </div>
            <div>
              <input
                type="checkbox"
                onChange={() =>
                  setJobType([jobType[0], jobType[1], !jobType[2]])
                }
              />
              <label>intern</label>
            </div>
          </div>
        </div>
        <div className="salary-input">
          <div>Salary: </div>
          <div className="salary-min-max-input">
            <div className="salary-min-input">
              min
              <input
                type="number"
                min={0}
                onChange={(e) => {
                  setSalaryMin(e.target.value);
                }}
              />
            </div>
            <div className="salary-max-input">
              max
              <input
                type="number"
                min={0}
                onChange={(e) => {
                  setSalaryMax(e.target.value);
                }}
              />
            </div>
          </div>
        </div>

        <div
          className="submit-button"
          onClick={() => {
            filterFetch();
            console.log("submitted");
          }}
        >
          Submit
        </div>
      </div>
    </div>
  );
};

export default FilterBox;
