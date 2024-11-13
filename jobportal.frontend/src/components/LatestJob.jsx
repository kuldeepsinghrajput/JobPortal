import React from 'react';
import JobCard from './JobCard';
import { useSelector } from 'react-redux'; 

export const LatestJob = () => {
  // Use useSelector to get the allJobs from the Redux store
  const allJobs =  useSelector((store) => store.job.allJobs);

  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Job Openings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allJobs && allJobs.length === 0 ? (
          <span>No Job Available</span>  // Render this if no jobs
        ) : (
          allJobs.map((job, index) => (
            <JobCard key={index} job={job} />  // Render JobCards if jobs are present
          ))
        )}
      </div>
    </div>
  );
};
