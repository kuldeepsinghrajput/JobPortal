import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';
import { setLoading } from '@/redux/authSlice';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import useGetCompanyById from '@/hooks/useGetCompanyById';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const CompanyModal = ({ isOpen, onRequestClose, companyId }) => {
  useGetCompanyById(companyId);
  const dispatch = useDispatch();
  const singleCompany = useSelector(state => state.company.singleCompany);
  const loading = useSelector(state => state.auth.loading);
  
  const [formData, setFormData] = useState((companyId==null||singleCompany==null)?{ name: '', description: '', website: '', location: '', logo: null, logoPreview: null }:{...singleCompany,logoPreview:singleCompany.logo});
   
  useEffect(()=>{
    setFormData((companyId==null||singleCompany==null)?{ name: '', description: '', website: '', location: '', logo: null, logoPreview: null }:{...singleCompany,logoPreview:singleCompany.logo});
  },[companyId,singleCompany]);
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData({ ...formData, logo: file, logoPreview: previewUrl });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    const form = new FormData();
    form.append('companyName', formData.name);
    form.append('description', formData.description);
    form.append('website', formData.website);
    form.append('location', formData.location);
    if (formData.logo) {
      form.append('file', formData.logo);
    }

    try {
      let response;
      if (companyId) {
        response = await axios.put(`${COMPANY_API_END_POINT}/update/${companyId}`, form, { withCredentials: true });
         
      } else {
        response = await axios.post(`${COMPANY_API_END_POINT}/register`, form, { withCredentials: true });
        }
        if(response.data.success)
          toast.success(response.data.message);
        else      
        toast.error(response.data.message);
      onRequestClose();
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onRequestClose}>
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
      <Dialog.Content className="fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <Dialog.Title className="text-lg font-medium text-gray-900">
            {companyId ? 'Update Company' : 'Register Company'}
          </Dialog.Title>
          <Dialog.Close asChild>
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              ×
            </button>
          </Dialog.Close>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 size={48} color="#123abc" strokeWidth={2} />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="flex justify-center mb-4">
                <Avatar className="relative">
                  <AvatarImage src={formData.logoPreview} alt="Company Logo" className="w-24 h-24 rounded-full border" />
                  <AvatarFallback className="w-24 h-24 rounded-full border bg-gray-200 flex items-center justify-center">
                     {formData?.name
                            ? formData.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()
                                .slice(0, 2)
                            : "NA"}
                  </AvatarFallback>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </Avatar>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Website</label>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  onClick={onRequestClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600"
                >
                  {companyId ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          )}
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};


export default CompanyModal;