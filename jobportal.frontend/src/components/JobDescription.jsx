import { setSingleJob } from "@/redux/jobSlice";
import {store} from "@/redux/store";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const JobDescription = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const { singleJob } = useSelector((store) => store.job);
  const [applied, setApplied] = useState(false);
  const jobId = params.id;
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

 const handleApply = async () => {
  try {
    const res = await axios.get(
      `${APPLICATION_API_END_POINT}/apply/${jobId}`,
       { withCredentials: true }
    );
    if (res.data.success) {
      toast.success(res.data.message);
      setApplied(true);

      // Fetch the updated job data
      const updatedJobRes = await axios.get(
        `${JOB_API_END_POINT}/get/${jobId}`,
        { withCredentials: true }
      );
      if (updatedJobRes.data.success) {
        dispatch(setSingleJob(updatedJobRes.data.job));
      }
    }
  } catch (error) {
    console.log(error);
  }
};
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="flex items-center mb-4">
        <img
          src={singleJob?.company?.logo}
          alt={`${singleJob?.company?.name} logo`}
          className="w-16 h-16 mr-4"
        />
        <h1 className="text-3xl font-bold">{singleJob?.title}</h1>
      </div>
      <p className="text-gray-700 mb-2">
        <strong>Description:</strong> {singleJob?.description}
      </p>

      <p className="text-gray-700 mb-2">
        <strong>Location:</strong> {singleJob?.location}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Salary:</strong> ${singleJob?.salary}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Experience Level:</strong> {singleJob?.experienceLevel} years
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Job Type:</strong> {singleJob?.jobType}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Position:</strong> {singleJob?.position}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Total Applicants: </strong>
        {singleJob?.applications?.length > 0
          ? singleJob.applications.length
          : "Be the first applicant"}
      </p>

      <div className="mt-4">
        <h2 className="text-2xl font-semibold mb-2">Requirements:</h2>
        <ul className="list-disc list-inside">
          {singleJob?.requirements.map((req, index) => (
            <li key={index} className="text-gray-700">
              {req}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <h2 className="text-2xl font-semibold mb-2">Company:</h2>
        <p className="text-gray-700">{singleJob?.company?.name}</p>
      </div>
      <div className="mt-6">
        {applied ? (
          <button className="px-4 py-2 bg-gray-500 text-white rounded" disabled>
            Already Applied
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleApply}
          >
            Apply
          </button>
        )}
      </div>
    </div>
  );
};

export default JobDescription;
