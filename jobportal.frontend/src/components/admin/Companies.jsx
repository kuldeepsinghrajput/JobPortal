import React, { useEffect, useState } from "react";
import Navbar from "../Shared/Navbar";
import { Plus, Edit, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import useGetAllCompanies from "@/Hooks/useGetAllCompanies";
import CompanyModal from "./CompanyModal"; // Import the CompanyModal component
import { setCompanies } from "@/redux/companySlice";
import { setLoading } from "@/redux/authSlice";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default function Companies() {
  useGetAllCompanies();
  const dispatch = useDispatch();
  const [filterText,setFilterText]=useState("");
  const companies = useSelector((store) => store.company.companies);
  const [filteredCompanies,setFilteredCompanies]=useState(companies);
  const loading = useSelector((store) => store.auth.loading);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
useEffect(()=>
{
  setFilteredCompanies(companies.filter((company) =>
    Object.values(company).some((value) =>
      value.toString().toLowerCase().includes(filterText.toLowerCase())
    )
    ));

},[filterText,companies]);
  const fetchAllCompanies = async () => {
    dispatch(setLoading(true));
    try {
      const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setCompanies(res.data.companies));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  const handleOpenModal = (companyId = null) => {
    setSelectedCompanyId(companyId);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCompanyId(null);

    fetchAllCompanies();
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
<div className="bg-gray-100 py-3">
      <div className="container mx-auto text-center ">
         <div className="flex justify-center mb-">
  <input
    type="text"
    placeholder="Search company, description, website, location..."
    className="w-3/5 p-2 border border-gray-300 rounded-full focus:outline-none text-[#f83002]"
  onChange={(e)=>setFilterText(e.target.value)}
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
                <th className="py-2 px-4 text-left">Description</th>
                <th className="py-2 px-4 text-left">Website</th>
                <th className="py-2 px-4 text-left">Location</th>
                <th className="py-2 px-4 text-right">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-full"
                    onClick={() => handleOpenModal()}
                  >
                    <Plus />
                  </button>
             </th>
              </tr>
            </thead>
            <tbody>
              {
              filteredCompanies.length>0?
              (filteredCompanies.map((company) => (
                <tr key={company._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 flex items-center">
                    <Avatar className="relative">
                      <AvatarImage
                        src={company.logo}
                        alt="Company Logo"
                        className="w-10 h-10 mr-2 rounded-full border"
                      />
                      <AvatarFallback className="w-10 h-10 mr-2 rounded-full border bg-gray-200 flex items-center justify-center">
                        {company.name
                          ? company.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()
                              .slice(0, 2)
                          : "NA"}
                      </AvatarFallback>
                    </Avatar>{" "}
                    {company.name}
                  </td>
                  <td className="py-2 px-4">{company.description}</td>
                  <td className="py-2 px-4">
                    <a
                      href={company.website}
                      className="text-blue-500 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {company.website}
                    </a>
                  </td>
                  <td className="py-2 px-4">{company.location}</td>
                  <td className="py-2 px-4 text-right">
                    <button
                      className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600 "
                      onClick={() => handleOpenModal(company._id)}
                    >
                      <Edit />
                    </button>
                  </td>
                </tr>
              ))
              
              ):
              (
                (
                  <tr>
                    <td colSpan="5">
                      <div className="flex flex-col justify-center items-center pt-12 h-5/6">
                        <p className="text-4xl font-semibold ">No companies to display</p>
                       <br/>
                       <br/>
                        
                        <p className="text-3xl">Try adding a new one!</p>
                        <br/>
                        <br/>
                        <p className="text-2xl">
                          Click on{" "}
                          <button  onClick={() => handleOpenModal()} className="bg-blue-500 text-white px-4 py-2 rounded-full">
                            <Plus />
                          </button>{" "}
                          to add a new company.
                        </p>
                      </div>
                    </td>
                  </tr>
                )
              )
 
              }
            </tbody>
          </table>
        )}
      </div>
      <CompanyModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        companyId={selectedCompanyId}
      />
    </>
  );
}
