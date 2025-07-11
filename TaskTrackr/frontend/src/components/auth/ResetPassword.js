import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ResetPassword = ({ showToast }) => { // Added showToast
  const [email, setEmail] = useState('');
  // const [message, setMessage] = useState(''); // Handled by toast
  // const [error, setError] = useState(''); // Handled by toast

  const onChange = (e) => setEmail(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();
    // setMessage(''); // Handled by toast
    // setError(''); // Handled by toast
    try {
      const res = await axios.post('/api/auth/reset-password', { email });
      const successMsg = res.data.msg || 'Password reset instructions sent (simulated).';
      // setMessage(successMsg);
      showToast(successMsg, 'success');
      setEmail('');
    } catch (err) {
      const errorMsg = err.response && err.response.data && err.response.data.msg
                       ? err.response.data.msg
                       : 'Failed to send reset instructions.';
      // setError(errorMsg);
      showToast(errorMsg, 'error');
      console.error('Reset Password error:', err.response ? err.response.data : err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Reset Password</h2>
      {/* Messages handled by global Toast component */}
      {/* {message && <p className="text-green-500 text-sm text-center mb-4">{message}</p>} */}
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
            placeholder="Enter your email"
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Send Reset Link
          </button>
        </div>
      </form>
      <div className="text-center">
        <Link to="/login" className="font-bold text-sm text-blue-500 hover:text-blue-800">
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ResetPassword;
