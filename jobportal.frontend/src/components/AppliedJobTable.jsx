import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect, useState } from 'react';  
 
const AppliedJobTable = () => {

const [applications,setApplications]=useState([]);
const fetchAllApplictions = async () => {
  try {
    const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
      withCredentials: true,  
    });
    if (res.data.success) {
       setApplications(res.data.applications);}
  } catch (error) {
    console.log(error);
  }
};
useEffect(()=>{
fetchAllApplictions();},[])
console.log(applications);




  return (
    <div >
      <table className="min-w-full  border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">Date</th>
            <th className="py-2 px-4 border-b text-left">Job Role</th>
            <th className="py-2 px-4 border-b text-left">Company</th>
            <th className="py-2 px-4 border-b text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{new Date(application?.createdAt).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b">{application?.Job?.title}</td>
              <td className="py-2 px-4 border-b">{application?.Job?.company?.name}</td>
              <td className="py-2 px-4 border-b">{application.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppliedJobTable;
