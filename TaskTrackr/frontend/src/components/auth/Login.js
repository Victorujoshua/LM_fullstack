import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Corrected import

const Login = ({ setToken, showToast }) => { // Added showToast prop
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['x-auth-token'] = res.data.token;
      showToast('Login successful!', 'success');
      navigate('/dashboard');
    } catch (err) {
      const errorMsg = err.response && err.response.data && err.response.data.msg
                       ? err.response.data.msg
                       : 'Login failed. Please check your credentials.';
      setError(errorMsg); // Keep local error for form if needed
      showToast(errorMsg, 'error');
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['x-auth-token'];
      console.error('Login error:', err.response ? err.response.data : err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
      {/* Removed direct error display, relying on toast now, but can be kept if preferred */}
      {/* {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>} */}
      <form onSubmit={onSubmit}>
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
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            placeholder="Password"
            minLength="6"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Login
          </button>
          <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/signup">
            Don't have an account? Sign Up
          </a>
        </div>
        <div className="text-center mt-4">
            <a className="inline-block align-baseline font-bold text-sm text-gray-600 hover:text-gray-800" href="/reset-password">
                Forgot Password?
            </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
