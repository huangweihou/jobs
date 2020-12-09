import React, { useState } from "react";
import "./JobContent.css";

const JobContent = (props) => {
  const { selectedJob } = props;
  return (
    <div className="job-detail-container">
      <h1>JobTitle: {selectedJob ? selectedJob["JobTitle"] : null}</h1>
      <h2>Location: {selectedJob ? selectedJob["Location"] : null}</h2>
      <h2>Employer: {selectedJob ? selectedJob["Employer"] : null}</h2>
      <h2>Job Type: {selectedJob ? selectedJob["JobType"] : null}</h2>
      <h2>Skill: {selectedJob ? selectedJob["Skill"] : null}</h2>
      <h2>Description: </h2>
      <p>{selectedJob ? selectedJob["Description"] : null}</p>
    </div>
  );
};

export default JobContent;
