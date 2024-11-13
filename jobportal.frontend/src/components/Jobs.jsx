import React, { useState, useMemo } from 'react';
import Navbar from './Shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';

const Jobs = () => {
  const allJobs = useSelector((store) => store.job.allJobs);

  // State to hold selected filters
  const [selectedFilters, setSelectedFilters] = useState({
    Location: '',
    Industry: '',
    Salary: ''
  });

  const filterBySalary = (salary, selectedRange) => {
    switch (selectedRange) {
      case '8-40K':
        return salary >= 8000 && salary <= 40000;
      case '42-1 Lakh':
        return salary >= 42000 && salary <= 100000;
      case '1 Lakh to 5 Lakh':
        return salary >= 100000 && salary <= 500000;
      default:
        return true;
    }
  };
  // Filter logic
  const filteredJobs = useMemo(() => {
    return allJobs.filter((job) => {
      const matchesLocation = selectedFilters.Location
        ? job.location.toLowerCase() === selectedFilters.Location.toLowerCase()
        : true;
  
      const matchesIndustry = selectedFilters.Industry
        ? job.title.toLowerCase().includes(selectedFilters.Industry.toLowerCase())
        : true;
  
      const matchesSalary = selectedFilters.Salary
        ? filterBySalary(job.salary, selectedFilters.Salary)
        : true;
  
      return matchesLocation && matchesIndustry && matchesSalary;
    });
  }, [allJobs, selectedFilters]);
  
 
  return (
    <div> 
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>
      <div className="container mx-auto p-4 flex mt-11">
        <div className="w-full md:w-1/4 lg:w-1/5 fixed top-auto">
          {/* Pass selectedFilters and setSelectedFilters to FilterCard */}
          <FilterCard selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
        </div>
        <div className="w-full md:w-3/4 lg:w-4/5 ml-80">
          {filteredJobs && filteredJobs.length === 0 ? (
            <div className="text-center mt-4">
              <p className="text-gray-600">No jobs available with the selected filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {filteredJobs.map((job, index) => (
                <Job key={index} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
