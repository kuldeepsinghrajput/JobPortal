import React, { useEffect } from 'react';
import Navbar from '../Shared/Navbar';
import ApplicantsTable from './ApplicantsTable';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
 import axios from 'axios';
import { setAllApplicants } from '@/redux/applcationSlice';

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);  
 
  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, {
          withCredentials: true, // Assuming this is required
        });
        if (res.data.success) {
          dispatch(setAllApplicants(res.data.job.applications)); // Fixed 'applcations' typo
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, [params.id, dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <h1 className="font-bold text-xl my-5">Applicants ({applicants.length}) </h1> {/* Dynamic applicant count */}
        <ApplicantsTable /> {/* Passing applicants data to ApplicantsTable */}
      </div>
    </div>
  );
};

export default Applicants;
