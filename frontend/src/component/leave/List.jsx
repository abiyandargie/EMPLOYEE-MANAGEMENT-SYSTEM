import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import axios from "axios";

const List = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { user } = useAuth(); // Get logged-in user info
  const { id } = useParams(); // Employee ID from URL (for admin view)

  const fetchLeaves = async () => {
    let fetchId = user.role === "admin" ? id : user._id; // Admin sees employee leaves, employee sees their own

    if (!fetchId) {
      console.error("User ID is missing");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:4000/api/leave/${fetchId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setLeaves(response.data.leaves || []);
      } else {
        alert("Failed to fetch leave details");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(
        error.response?.data?.error ||
          "An error occurred while fetching leave details"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, [id]); // Fetch when the employee ID changes

  return (
    <div className="p-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Manage Leaves</h2>
      </div>

      {/* ✅ Show "Add Leave" button ONLY for employees */}
      {user.role === "employee" && (
        <div className="flex justify-end my-4">
          <Link
            to="/employee-dashboard/add-leave"
            className="px-4 py-2 bg-teal-600 rounded text-white"
          >
            + Add New Leave
          </Link>
        </div>
      )}

      <table className="w-full text-sm text-left text-gray-500 mt-6">
        <thead className="text-center text-gray-700">
          <tr>
            <th className="px-6 py-3">SNO</th>
            <th className="px-6 py-3">Leave Type</th>
            <th className="px-6 py-3">From</th>
            <th className="px-6 py-3">To</th>
            <th className="px-6 py-3">Description</th>
            <th className="px-6 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6" className="text-center py-4">Loading...</td>
            </tr>
          ) : leaves.length > 0 ? (
            leaves.map((leave, index) => (
              <tr key={leave._id}>
                <td className="px-6 py-3">{index + 1}</td>
                <td className="px-6 py-3">{leave.leaveType}</td>
                <td className="px-6 py-3">{new Date(leave.startDate).toLocaleDateString()}</td>
                <td className="px-6 py-3">{new Date(leave.endDate).toLocaleDateString()}</td>
                <td className="px-6 py-3">{leave.reason}</td>
                <td className="px-6 py-3">{leave.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4">No leaves found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default List;
