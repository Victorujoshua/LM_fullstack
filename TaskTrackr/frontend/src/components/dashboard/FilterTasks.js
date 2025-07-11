import React from 'react';

const FilterTasks = ({ currentFilter, onFilterChange }) => {
  const filterOptions = ['All', 'Pending', 'In Progress', 'Completed'];

  return (
    <div className="my-4 flex items-center justify-start space-x-2">
      <label htmlFor="taskFilter" className="text-sm font-medium text-gray-700">Filter by status:</label>
      <select
        id="taskFilter"
        name="taskFilter"
        className="mt-1 block w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm"
        value={currentFilter}
        onChange={(e) => onFilterChange(e.target.value)}
      >
        {filterOptions.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default FilterTasks;
