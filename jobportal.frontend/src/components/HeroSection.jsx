import { setSearchQuery } from '@/redux/jobSlice';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const [query,setQuery]=useState("");
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const serachJobHandler=()=>
  {
    dispatch(setSearchQuery(query));
    navigate("/browse");
  }
  return (
    <div className="bg-gray-100 py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold text-indigo-600 mb-4">Welcome to <span className='text-[#000000]'>Job<span className='text-[#f83002]'>Portal</span></span></h1>
        <p className="text-lg text-gray-700 mb-8">Find your dream job with us</p>
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search for jobs..."
            onChange={(e)=>setQuery(e.target.value)}
            className="w-1/2 p-2 border border-gray-300 rounded-l-md focus:outline-none"
          />
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 focus:outline-none" 
          onClick={serachJobHandler}
          >
            Search
          </button>
        </div>
        
      </div>
    </div>
  );
}
