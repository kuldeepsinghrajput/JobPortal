import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { setCompanies } from '@/redux/companySlice';
import { setLoading } from '@/redux/authSlice';

const useGetAllCompanies = ( ) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllCompanies = async () => {
      dispatch(setLoading(true));
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchAllCompanies();
  }, [dispatch]);
};

export default useGetAllCompanies;
