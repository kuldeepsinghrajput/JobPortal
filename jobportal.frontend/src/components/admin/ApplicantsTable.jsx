import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import axios from 'axios';
import { MoreHorizontal } from 'lucide-react';
import React from 'react';
import { useSelector } from 'react-redux'; 
import { toast } from 'sonner';

const shortlistingStatus = ['Accepted',   'Rejected']; // Example array

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);  
 const statusHandler=async (status,id)=>
 {
  try
  {
    const res=await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`,{status },{withCredentials:true});
    if(res.data.success)
    toast.success(res.data.message);
    toast.error(res.data.message);
  
      
  }
  catch(error)
  {
    console.log(error);
  }

 }
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <caption className="text-lg font-semibold py-4">A list of your recent applied users</caption>
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left">Full Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Contact</th>
            <th className="px-4 py-2 text-left">Resume</th>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
         {applicants&&applicants.map((application,index)=>(
          <tr className="border-t">
            <td className="px-4 py-2">{application?.applicant?.fullname}</td>
            <td className="px-4 py-2">{application?.applicant?.email}</td>
            <td className="px-4 py-2">{application?.applicant?.phoneNumber}</td>
            <td className="px-4 py-2 text-blue-600 cursor-pointer">
              {
              application?.applicant?.profile?.resume?
              (<a href={application?.applicant?.profile?.resume} target='_blank' rel="noopener noreferror">{application?.applicant?.profile?.resumeOriginalName}</a>)
              :(<span>NA</span>)
}</td>
            <td className="px-4 py-2">{new Date(application?.createdAt).toLocaleDateString()}</td>
            <td className="px-4 py-2 text-right">
  <Popover>
    <PopoverTrigger asChild>
      <button className="p-2 rounded-md hover:bg-gray-200 focus:outline-none">
        <MoreHorizontal className="w-5 h-5" />
      </button>
    </PopoverTrigger>
    <PopoverContent className="w-48 bg-white shadow-md rounded-md p-2">
      {shortlistingStatus.map((status, index) => (
        <div
          key={index}
          className="px-4 py-2 cursor-pointer justify-center hover:bg-gray-100 rounded-md transition-colors duration-200 flex items-center"
          onClick={() => statusHandler(status.toLowerCase(), application?._id)}
        >
          <span className="text-sm">{status}</span>
        </div>
      ))}
    </PopoverContent>
  </Popover>
</td>

          </tr>
  ))
}  </tbody>
      </table>
    </div>
  );
};

export default ApplicantsTable;
