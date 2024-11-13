import React, { useEffect, useState } from "react";
import Navbar from "../Shared/Navbar";
import { Plus, Edit, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { setAllJobs } from "@/redux/jobSlice";
import { setLoading } from "@/redux/authSlice"; 
import { JOB_API_END_POINT } from "@/utils/constant";
import { useNavigate } from "react-router-dom";

export default function Ajobs() {
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const [filterText, setFilterText] = useState("");
  const allJobs = useSelector((store) => store.job.allJobs);
  const loading = useSelector((store) => store.auth.loading);
  const [filteredJobs, setFilteredJobs] = useState([]);
 
  const fetchAllAdminJobs = async () => {
    dispatch(setLoading(true));
    try {
      const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {
        withCredentials: true,
      });
       if (res.data.success) {
        dispatch(setAllJobs(res.data.jobs));
      }
      else
      { dispatch(setAllJobs([]));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchAllAdminJobs();
  }, []);
  useEffect(() => {
    setFilteredJobs(
      allJobs.filter((job) =>
        Object.values(job).some((value) =>
          value && value.toString().toLowerCase().includes(filterText.toLowerCase())
        ) ||
        (job.company && job.company.name.toLowerCase().includes(filterText.toLowerCase()))
      )
    );
  }, [filterText, allJobs]);
  
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="bg-gray-100 py-3">
          <div className="container mx-auto text-center">
            <div className="flex justify-center mb-4">
              <input
                type="text"
                placeholder="Search Job, description, Skills, location..."
                className="w-3/5 p-2 border border-gray-300 rounded-full focus:outline-none text-[#f83002]"
                onChange={(e) => setFilterText(e.target.value)}
              />
            </div>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 size={48} color="#123abc" strokeWidth={2} />
          </div>
        ) : (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 text-left">Company</th>
                <th className="py-2 px-4 text-left">Title</th>
                <th className="py-2 px-4 text-left">Requirements</th>
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-right">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-full"
                    onClick={() => navigate(`/admin/jobs/newjob`)}
                  >
                    <Plus />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <tr key={job._id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 flex items-center">
                      <Avatar className="relative">
                        <AvatarImage
                          src={job?.company?.logo}
                          alt="Company Logo"
                          className="w-10 h-10 mr-2 rounded-full border"
                        />
                        <AvatarFallback className="w-10 h-10 mr-2 rounded-full border bg-gray-200 flex items-center justify-center">
                          {job?.company?.name
                            ? job.company.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()
                                .slice(0, 2)
                            : "NA"}
                        </AvatarFallback>
                      </Avatar>{" "}
                      {job?.company?.name}
                    </td>
                    <td className="py-2 px-4">{job.title}</td>
                    <td className="py-2 px-4">
                      {job?.requirements?.join(" ") || "NA"}
                    </td>
                    <td className="py-2 px-4">
                      {new Date(job.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 text-right">
                      <button
                        className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600"
                        onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                      >
                        Applicants
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">
                    <div className="flex flex-col justify-center items-center pt-12 h-5/6">
                      <p className="text-4xl font-semibold">
                        No jobs to display
                      </p>
                      <br />
                      <br />
                      <p className="text-3xl">Try adding a new one!</p>
                      <br />
                      <br />
                      <p className="text-2xl">
                        Click on{" "}
                        <button
                          onClick={() => navigate(`/admin/jobs/newjob`)}
                          className="bg-blue-500 text-white px-4 py-2 rounded-full"
                        >
                          <Plus />
                        </button>{" "}
                        to add a new job.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>    
    </>
  );
}
