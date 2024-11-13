import React, { useEffect } from 'react'
import Jobs from './components/Jobs';
import Navbar from './components/Shared/Navbar';
import Job from './components/Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from './redux/jobSlice';
import useGetAllJobs from './Hooks/useGetAllJobs';
 
   const Browse = () => {
    useGetAllJobs();
    const {allJobs}=useSelector(store=>store.job);
    const dispatch=useDispatch();
    useEffect(()=>
    {
dispatch(setSearchQuery(""));
    })
    return (
      <div> 
        <div className="fixed top-0 left-0 w-full z-50">
          <Navbar />
        </div>
        <div className="container mx-auto p-4 flex mt-16">
          <div className="w-full">
            {allJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {allJobs.map((job, index) => (
                  <Job key={index} job={job} />
                ))}
              </div>
            ) : (
              <div className="text-center mt-4">
                <p className="text-gray-600">No jobs available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  
export default Browse