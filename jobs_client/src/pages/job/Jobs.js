import React, { useState, useEffect } from "react";
import JobContent from "../../components/JobContent/JobContent";
import JobSideList from "../../components/JobSideList/JobSideList";
import FilterBox from "../../components/FilterBox/FilterBox";
import { fetchAllJobUrl } from "../../constants/constants";
import "./Jobs.css";

const Jobs = (props) => {
  const [allJob, setAllJob] = useState();
  const [selectedJob, setSelectedJob] = useState();
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState([false, false, false]);
  const [employer, setEmployer] = useState("");
  const [skill, setSkill] = useState("");

  // const { JobsArr } = props;
  useEffect(() => {
    getAllJobData();
    // setAllJob();
  }, []);

  const getAllJobData = async () => {
    const allJobRes = await fetch(fetchAllJobUrl).then((res) => res.json());
    //console.log("allJobRes", allJobRes);

    setAllJob(allJobRes);
  };

  return (
    <div>
      <FilterBox
        setAllJob={setAllJob}
        jobTitle={jobTitle}
        setJobTitle={setJobTitle}
        location={location}
        setLocation={setLocation}
        jobType={jobType}
        setJobType={setJobType}
        employer={employer}
        setEmployer={setEmployer}
        skill={skill}
        setSkill={setSkill}
      />
      <div className="job-container">
        <JobSideList
          allJob={allJob}
          selectedJob={selectedJob}
          setSelectedJob={setSelectedJob}
        />
        <JobContent selectedJob={selectedJob} />
      </div>
    </div>
  );
};

export default Jobs;
