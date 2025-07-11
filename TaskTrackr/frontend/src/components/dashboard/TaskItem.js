import React from 'react';

const TaskItem = ({ task, onEdit, onDelete }) => {
  const { _id, title, description, dueDate, status } = task;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  let statusColor = 'bg-yellow-200 text-yellow-800'; // Pending
  if (status === 'In Progress') {
    statusColor = 'bg-blue-200 text-blue-800';
  } else if (status === 'Completed') {
    statusColor = 'bg-green-200 text-green-800';
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-5 mb-4 border border-gray-200 hover:shadow-xl transition-shadow duration-200">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-xl font-semibold text-gray-800 mb-1">{title}</h4>
          <p className={`text-xs font-semibold inline-block px-2 py-1 rounded-full ${statusColor}`}>
            {status}
          </p>
        </div>
        <div className="flex-shrink-0 space-x-2">
          <button
            onClick={() => onEdit(task)}
            className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-1 px-3 rounded-md transition duration-150"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(_id)}
            className="text-sm bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded-md transition duration-150"
          >
            Delete
          </button>
        </div>
      </div>
      {description && (
        <p className="text-gray-600 mt-2 text-sm">{description}</p>
      )}
      <div className="mt-3">
        <p className="text-gray-500 text-xs">
          <strong>Due Date:</strong> {formatDate(dueDate)}
        </p>
      </div>
    </div>
  );
};

export default TaskItem;
