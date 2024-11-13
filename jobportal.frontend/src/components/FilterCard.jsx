import React from 'react';

const FilterCard = ({ selectedFilters, setSelectedFilters }) => {
  const filterData = [
    {
      filterType: "Location",
      array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai","Chennai"]
    },
    {
      filterType: "Industry",
      array: ["Frontend Developer", "Backend Developer", "Fullstack Developer"]
    },
    {
      filterType: "Salary",
      array: ["8-40K", "42-1 Lakh", "1 Lakh to 5 Lakh"]
    }
  ];

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters({
      ...selectedFilters,
      [filterType]: value
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h1 className="text-xl font-semibold mb-4">Filter Jobs</h1>
      <hr className="mt-3" />
      {filterData.map((filter, index) => (
        <div key={index} className="mb-4">
          <h2 className="text-lg font-medium">{filter.filterType}</h2>
          {filter.array.map((item, idx) => (
            <div key={idx} className="flex items-center mb-2">
              <input
                type="radio"
                id={`${filter.filterType}-${item}`}
                name={filter.filterType}
                value={item}
                checked={selectedFilters[filter.filterType] === item}
                onChange={() => handleFilterChange(filter.filterType, item)}
                className="mr-2"
              />
              <label htmlFor={`${filter.filterType}-${item}`} className="text-gray-700">
                {item}
              </label>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
