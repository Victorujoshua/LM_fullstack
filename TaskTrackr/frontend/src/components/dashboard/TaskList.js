import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onEdit, onDelete, currentFilter }) => {
  if (!tasks || tasks.length === 0) {
    let message = "No tasks yet. Add one above!";
    if (currentFilter !== "All") {
        message = `No tasks found for filter: "${currentFilter}".`;
    }
    return <p className="text-gray-600 mt-4 text-center">{message}</p>;
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-3">
        {currentFilter === "All" ? "All Tasks" : `Filtered by: ${currentFilter}`}
      </h3>
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
