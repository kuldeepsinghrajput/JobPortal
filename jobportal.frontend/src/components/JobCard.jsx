import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

const JobCard = ({ job }) =>{ 
  
  const navigate=useNavigate();
  return (
  <div className="p-4 bg-white shadow-md rounded-lg mb-4">
    <div className="flex items-center mb-2">
    <Avatar className="relative">
  <AvatarImage 
    src={job?.company?.logo} 
    alt={`${job?.company?.name} logo`} 
    className="w-10 h-10 mr-3 rounded-full border" 
  />
  <AvatarFallback 
    className="w-10 h-10 mr-3 rounded-full border bg-gray-200 flex items-center justify-center"
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
        <h2 className="text-xl font-bold">{job?.title}</h2>
        <p className="text-gray-600">{job?.company?.name}</p>
      </div>
    </div>
    <p className="text-gray-800 mb-2">{job.location}</p>
    <p className="text-gray-600 mb-2">{job.jobType}</p>
    <p className="text-gray-800 mb-2">{job.salary}</p>
    <p className="text-gray-600 mb-2">
  Posted on: {new Date(job.createdAt).toLocaleDateString()}
</p>
    <p className="text-gray-800 mb-2">{job.description}</p>
    <div className="flex flex-wrap mb-2">
    {job.requirements && job.requirements.length > 0 ? (
  job.requirements.map((skill, index) => (
    <span
      key={index}
      className="bg-gray-200 text-gray-800 text-sm font-medium mr-2 mb-2 px-2.5 py-0.5 rounded"
    >
      {skill}
    </span>
  ))
) : (
  <span>No skills specified</span> // Fallback if requirements is empty or undefined
)}

    </div>
    <button  onClick={()=>navigate(`/description/${job?._id}`)}  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
      Apply Now
    </button>
  </div>
);}

export default JobCard;
