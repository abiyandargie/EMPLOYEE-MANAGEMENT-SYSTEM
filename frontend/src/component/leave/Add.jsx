import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const { user } = useAuth();
  const [leave, setLeave] = useState({
  userId: user._id,
  leaveType: '',
  startDate: '',
  endDate: '',
  reason: '',   
  status: 'Pending',
  appliedAt: new Date(),
});


  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeave({
      ...leave,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found. Please log in again.");
        return;
      }
  
      console.log("Submitting leave request:", leave); // Log the leave data
  
      const response = await axios.post(
        "http://localhost:4000/api/leave/add",
        leave,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      if (response.data.success) {
        navigate(`/employee-dashboard/leaves/${user._id}`);
      } else {
        alert(response.data.error || "Failed to submit leave request");
      }
    } catch (error) {
      console.error("Error submitting leave request:", error); // Log the full error
  
      // Handle different types of errors
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
        alert(error.response?.data?.error || "Error submitting leave request");
      } else if (error.request) {
        // No response received (e.g., network error)
        console.error("No response received:", error.request);
        alert("No response received from server. Please check your connection.");
      } else {
        // Error setting up the request
        console.error("Error setting up request:", error.message);
        alert("Error setting up leave request. Please try again.");
      }
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Request for Leave</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Leave Type */}
          <div>
            <label htmlFor="leaveType" className="block text-sm font-medium text-gray-700">
              Leave Type
            </label>
            <select
              id="leaveType"
              name="leaveType"
              value={leave.leaveType}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Leave Type</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option> {/* Fixed spelling */}
              <option value="Annual Leave">Annual Leave</option>
            </select>
          </div>

          {/* Start Date */}
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
              From Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={leave.startDate}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* End Date */}
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
              To Date
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={leave.endDate}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div className="mt-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="reason"
            value={leave.reason}
            onChange={handleChange}
            placeholder="Reason for leave"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md h-24"
             
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 rounded"
        >
          Submit Leave Request
        </button>
      </form>
    </div>
  );
};

export default Add;