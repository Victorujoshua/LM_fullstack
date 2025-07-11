import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskForm = ({ taskToEdit, onTaskSaved, onCancelEdit, showToast }) => { // Added showToast
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'Pending',
  });
  // const [error, setError] = useState(''); // Error display can be handled by toast

  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title || '',
        description: taskToEdit.description || '',
        dueDate: taskToEdit.dueDate ? new Date(taskToEdit.dueDate).toISOString().split('T')[0] : '',
        status: taskToEdit.status || 'Pending',
      });
    } else {
      // Reset form if not editing
      setFormData({ title: '', description: '', dueDate: '', status: 'Pending' });
    }
  }, [taskToEdit]);

  const { title, description, dueDate, status } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    // setError(''); // Handled by toast
    try {
      let res;
      const taskData = { ...formData };
      if (!taskData.description) delete taskData.description;
      if (!taskData.dueDate) delete taskData.dueDate;

      const action = taskToEdit && taskToEdit._id ? 'updated' : 'created';

      if (taskToEdit && taskToEdit._id) {
        res = await axios.put(`/api/tasks/${taskToEdit._id}`, taskData);
      } else {
        res = await axios.post('/api/tasks', taskData);
      }
      onTaskSaved(res.data);
      showToast(`Task successfully ${action}!`, 'success');
      setFormData({ title: '', description: '', dueDate: '', status: 'Pending' });
    } catch (err) {
      const errorMsg = err.response && err.response.data && err.response.data.msg
        ? err.response.data.msg
        : (taskToEdit ? 'Failed to update task.' : 'Failed to create task.');
      // setError(errorMsg); // Handled by toast
      showToast(errorMsg, 'error');
      console.error('Task operation error:', err.response ? err.response.data : err.message);
    }
  };

  return (
    <div className="my-6 p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">
        {taskToEdit ? 'Edit Task' : 'Create New Task'}
      </h3>
      {/* {error && <p className="text-red-500 text-sm bg-red-100 p-2 rounded mb-3">{error}</p>} */}
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="title"
            value={title}
            onChange={onChange}
            required
            placeholder="Enter task title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="description"
            value={description}
            onChange={onChange}
            placeholder="Enter task description (optional)"
            rows="3"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dueDate">
              Due Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="date"
              name="dueDate"
              value={dueDate}
              onChange={onChange}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="status"
              value={status}
              onChange={onChange}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
        <div className="flex items-center">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {taskToEdit ? 'Save Changes' : 'Add Task'}
          </button>
          {taskToEdit && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="ml-4 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
