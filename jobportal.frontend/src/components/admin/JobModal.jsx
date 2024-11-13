import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, LucideArrowLeft } from 'lucide-react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import Navbar from '../Shared/Navbar';
import { toast } from 'sonner';

const JobModal = () => {
  const navigate = useNavigate();
  const loading = useSelector(store => store.auth.loading);
  const companies = useSelector(store => store.company.companies);

  const [formData, setFormData] = useState({
    companyId: '',
    title: '',
    description: '',
    requirements: '',
    experience: '',
    salary: '',
    position: '',
    location: '',
    jobType: ''
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [isDirty, setIsDirty] = useState(false); // Track if form is modified

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setIsDirty(true); // Set form as dirty when any input changes
  };
  const handleSelectChange = (company) => {
    setFormData({
      ...formData,
      companyId: company._id
    });
    setSearchTerm(""); // Set search term to the selected company name
    setIsDirty(true);
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${JOB_API_END_POINT}/post`, formData, { withCredentials: true });
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/admin/jobs');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error posting job:', error);
      toast.error('Error posting job');
    }
  };

  const getInitials = (name) => {
    return name
      ? name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
      : "NA";
  };

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const companyOptions = filteredCompanies.map(company => (
    <div key={company._id} onClick={() => handleSelectChange(company._id)} className="flex items-center cursor-pointer p-2 hover:bg-gray-200">
      <Avatar className="relative w-8 h-8 mr-2">
        {company.logo ? (
          <AvatarImage src={company.logo} alt={company.name} className="w-8 h-8 rounded-full" />
        ) : (
          <AvatarFallback className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            {getInitials(company.name)}
          </AvatarFallback>
        )}
      </Avatar>
      {company.name}
    </div>
  ));

  const handleBackButtonClick = () => {
    if (isDirty && !window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
      return; // Cancel navigation
    }
    navigate('/admin/jobs');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar className="fixed top-0 left-0 right-0 z-50"/> {/* Ensure navbar is fixed */}
        
      <div className="pt-20 px-4 max-w-lg mx-auto"> {/* Add padding top to avoid navbar overlap */}
        <button type="button" onClick={handleBackButtonClick} className="flex items-center text-blue-500 mb-4">
          <LucideArrowLeft className="mr-2" /> Back to Jobs
        </button>

        <h1 className="text-3xl font-bold mb-6 text-center">Post a Job</h1>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 shadow-lg rounded-lg">
        
{/* Company Selection */}
<div>
  <label className="block text-gray-700 mb-2">Company</label>
  <div className="relative">
    <input
      type="text"
      placeholder="Search company..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="border p-2 w-full rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {searchTerm && (
      <div className="absolute z-10 bg-white border rounded-md shadow-lg w-full mt-2 max-h-60 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center p-2"><Loader2 className="animate-spin text-blue-500" /></div>
        ) : (
          filteredCompanies.map(company => (
            <div key={company._id} onClick={() => handleSelectChange(company)} className="flex items-center cursor-pointer p-2 hover:bg-gray-200">
              <Avatar className="relative w-8 h-8 mr-2">
                {company.logo ? (
                  <AvatarImage src={company.logo} alt={company.name} className="w-8 h-8 rounded-full" />
                ) : (
                  <AvatarFallback className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    {getInitials(company.name)}
                  </AvatarFallback>
                )}
              </Avatar>
              {company.name}
            </div>
          ))
        )}
      </div>
    )}
  </div>

  {/* Display selected company */}
  {formData.companyId && (
    <div className="mt-2 text-gray-600">
      Selected Company: <strong>{companies.find(company => company._id === formData.companyId)?.name}</strong>
    </div>
  )}
</div>



          {/* Title */}
          <div>
            <label className="block text-gray-700 mb-2">Job Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border p-2 w-full rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border p-2 w-full rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Requirements */}
          <div>
            <label className="block text-gray-700 mb-2">Requirements</label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              className="border p-2 w-full rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Experience Level */}
          <div>
            <label className="block text-gray-700 mb-2">Experience Level</label>
            <input
              name="experience"
              value={formData.experience }
              onChange={handleChange}
              className="border p-2 w-full rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Salary */}
          <div>
            <label className="block text-gray-700 mb-2">Salary</label>
            <input
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="border p-2 w-full rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Position */}
          <div>
            <label className="block text-gray-700 mb-2">Position</label>
            <input
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="border p-2 w-full rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-700 mb-2">Location</label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="border p-2 w-full rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Job Type */}
          <div>
            <label className="block text-gray-700 mb-2">Job Type</label>
            <input
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="border p-2 w-full rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-500">
              {loading ? <Loader2 className="animate-spin mx-auto" /> : 'Post Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobModal;
