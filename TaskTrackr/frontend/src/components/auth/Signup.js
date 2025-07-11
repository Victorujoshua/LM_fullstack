import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Corrected import

const Signup = ({ setToken, showToast }) => { // Added showToast prop
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const [error, setError] = useState(''); // Keep for inline password match error
  // const [success, setSuccess] = useState(''); // Success message handled by toast
  const navigate = useNavigate();

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    // setSuccess(''); // Handled by toast
    if (password !== password2) {
      setError('Passwords do not match'); // Keep this specific inline error
      showToast('Passwords do not match', 'error');
      return;
    }
    try {
      const res = await axios.post('/api/auth/signup', { name, email, password });
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['x-auth-token'] = res.data.token;
      showToast('Signup successful! Redirecting...', 'success');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      const errorMsg = err.response && err.response.data && err.response.data.msg
                       ? err.response.data.msg
                       : 'Signup failed. Please try again.';
      // setError(errorMsg); // General errors handled by toast
      showToast(errorMsg, 'error');
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['x-auth-token'];
      console.error('Signup error:', err.response ? err.response.data : err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
      {/* Password match error still shown inline for better UX */}
      {error && error === 'Passwords do not match' && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
      {/* {success && <p className="text-green-500 text-sm text-center mb-4">{success}</p>} */}
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
            placeholder="Full Name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
            placeholder="Email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            placeholder="Password (min. 6 characters)"
            minLength="6"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password2">
            Confirm Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            name="password2"
            value={password2}
            onChange={onChange}
            required
            placeholder="Confirm Password"
            minLength="6"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
          <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/login">
            Already have an account? Login
          </a>
        </div>
      </form>
    </div>
  );
};

export default Signup;
