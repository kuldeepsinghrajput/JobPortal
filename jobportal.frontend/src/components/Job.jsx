import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

const Job = ({ job }) => {
  const navigate=useNavigate();

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4 bg-gray-100 flex justify-between items-center">
      <div className="text-gray-700 text-xs">
  Posted {job.createdAt ? Math.floor((new Date() - new Date(job.createdAt)) / (1000 * 60 * 60 * 24)) : 'unknown'} days ago
</div>

        <div className="flex items-center">
        <Avatar className="relative">
  <AvatarImage 
    src={job?.company?.logo} 
    alt={`${job?.company?.name} logo`} 
    className="w-10 h-10  rounded-full border" 
  />
  <AvatarFallback 
    className="w-10 h-10 rounded-full border bg-gray-200 flex items-center justify-center"
  >
    {job?.company?.name
      ? job.company.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : "NA"}
  </AvatarFallback>
  
</Avatar>
<div>
            <h2 className="text-lg font-bold">{job?.company?.name}</h2>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              {job.jobType}
            </span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
        <p className="text-gray-700 mb-4">{job.description}</p>
        <div className="flex justify-between items-center">

          <span className="text-gray-500">{job.location}</span>
 <button onClick={()=>navigate(`/description/${job?._id}`)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Job;
