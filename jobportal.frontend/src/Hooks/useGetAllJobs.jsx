import React,{useEffect} from "react";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setAllJobs } from "@/redux/jobSlice";

const useGetAllJobs=()=>{
    const dispatch=useDispatch();
    const {searchedQuery}=useSelector(store=>store.job);
    useEffect(()=>{

        const fetchAllJobs=async()=>
        {
            try{
                const res=await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,{withCredentials:true});
                if(res.data.success)
                {
                    dispatch(setAllJobs(res.data.jobs));

                }
                else  dispatch(setAllJobs([]));

            }
            catch(error)
            { dispatch(setAllJobs([]));
                console.log(error);
            }

        }
        fetchAllJobs();
    },[])



}
export default useGetAllJobs;