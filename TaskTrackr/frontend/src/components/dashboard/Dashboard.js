import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import FilterTasks from './FilterTasks';

const Dashboard = ({ showToast }) => { // Added showToast prop
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(''); // Errors handled by toast
  const [currentFilter, setCurrentFilter] = useState('All');

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    // setError(''); // Handled by toast
    try {
      const res = await axios.get('/api/tasks');
      setAllTasks(res.data); // Store all fetched tasks
      setTasks(res.data);
      setCurrentFilter('All');
    } catch (err) {
      console.error('Fetch tasks error:', err.response ? err.response.data : err.message);
      // setError('Failed to fetch tasks. Please try again later.');
      showToast('Failed to fetch tasks. Please try again later.', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]); // Added showToast to dependency array

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    if (currentFilter === 'All') {
      setTasks(allTasks);
    } else {
      setTasks(allTasks.filter(task => task.status === currentFilter));
    }
  }, [currentFilter, allTasks]);

  const handleTaskSaved = (savedTask) => {
    if (editingTask) {
      setAllTasks(prevTasks => prevTasks.map(task => (task._id === savedTask._id ? savedTask : task)));
    } else {
      setAllTasks(prevTasks => [savedTask, ...prevTasks]);
    }
    setEditingTask(null);
    // Toast is shown in TaskForm for save success/error
  };

  const handleEditTask = (task) =_=> {
    setEditingTask(task);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top to see form
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`/api/tasks/${taskId}`);
        setAllTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
        showToast('Task deleted successfully!', 'success');
      } catch (err) {
        console.error('Delete task error:', err.response ? err.response.data : err.message);
        // setError('Failed to delete task.'); // Handled by toast
        showToast('Failed to delete task.', 'error');
      }
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Tasks</h1>
      </div>

      {/* {error && <p className="text-red-500 bg-red-100 p-3 rounded mb-4">{error}</p>} */}

      <TaskForm
        taskToEdit={editingTask}
        onTaskSaved={handleTaskSaved}
        onCancelEdit={handleCancelEdit}
        showToast={showToast} // Pass showToast to TaskForm
      />

      <FilterTasks currentFilter={currentFilter} onFilterChange={setCurrentFilter} />

      {loading ? (
        <p className="text-center text-gray-600 mt-8">Loading tasks...</p>
      ) : (
        <TaskList
          tasks={tasks} // Pass filtered tasks to TaskList
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          currentFilter={currentFilter}
        />
      )}
    </div>
  );
};

export default Dashboard;
