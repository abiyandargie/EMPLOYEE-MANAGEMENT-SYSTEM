import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/authContext'; // Adjust the import path based on your folder structure
import { useNavigate } from 'react-router-dom';
import '../index.css';  
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // To display error messages

  const { login } = useAuth(); // Access login function from context
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // API call to login
      const response = await axios.post("http://localhost:4000/api/auth/login", { email, password });
      // console.log(response);

      if (response.data.success) {
        // Save user data and token
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        console.log(response)
        // Navigate based on user role
        if (response.data.user.role === "admin") {
          console.log(response.data.role)
          navigate('/admin-dashboard'); // Match with your router setup
        } else {
          navigate('/employee-dashboard');
        }
      }
    } catch (error) {
      // Handle error from server or network issues
      setError(
        error.response?.data?.error || "An unexpected error occurred. Please try again."
      );
    }
  };

  return (
    <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-600 from-50% to-gray-100 to-50% space-y-6">
      <h1 className="font-dance text-3xl font-bold mb-4 text-whi">Employee Management System</h1>
      <div className="border shadow-lg p-6 w-96 bg-white rounded-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {/* Display error message if any */}
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="mb-4 flex items-center justify-between">
            <div>
              <input type="checkbox" id="remember" className="form-checkbox" />
              <label htmlFor="remember" className="ml-2 text-gray-700 text-sm">
                Remember me
              </label>
            </div>
            <a href="#" className="text-teal-600 text-sm">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
