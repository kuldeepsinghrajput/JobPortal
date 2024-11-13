import React,{useEffect} from "react";
import axios from "axios";
import { COMPANY_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { useDispatch } from "react-redux";
import { setAllJobs } from "@/redux/jobSlice";
import { setSingleCompany } from "@/redux/companySlice";
import { setLoading } from "@/redux/authSlice";

const useGetCompanyById=(companyId)=>{
    const dispatch=useDispatch();
    useEffect(()=>{
   
        const fetchCompany=async()=>
        {  dispatch(setLoading(true));
            try{
                const res=await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`,{withCredentials:true});
                if(res.data.success)
                {
                    dispatch(setSingleCompany(res.data.company));

                }

            }
            catch(error)
            {
                console.log(error);
            }
            finally {
                dispatch(setLoading(false));
              }

        }
        
        if (companyId) fetchCompany();
    
    },[companyId,dispatch])



}
export default useGetCompanyById;