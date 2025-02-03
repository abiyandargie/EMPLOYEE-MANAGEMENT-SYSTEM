import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const Detail = () => {
  const { id } = useParams(); // Get Leave ID from URL
  const [leave, setLeave] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchLeave = async () => {
      console.log("Fetching leave details for ID:", id);

      try {
        const response = await axios.get(
          `http://localhost:4000/api/leave/detail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log("API Response:", response.data); // ✅ Check the API response here
        console.log("API Response:", response.data);
        if (response.data.success) {
          setLeave(response.data.leave);
        } else {
          console.error("API Error:", response.data.error);
          alert("Failed to fetch leave details");
        }
      } catch (error) {
        console.error("Error fetching leave:", error);
        alert(
          error.response?.data?.error ||
            "An error occurred while fetching leave details"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchLeave();
  }, [id]);

  const changeStatus = async (id, status) => {

    try {
      const response = await axios.put(
        `http://localhost:4000/api/leave/${id}`,{status},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("API Response:", response.data); // ✅ Check the API response here
      console.log("API Response:", response.data);
      if (response.data.success) {
        navigate('/admin-dashboard/leaves')
      }  
    } catch (error) {
      alert(error.response.data.error);
      
    }
      
  }

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!leave)
    return (
      <div className="text-center mt-10 text-red-300">
        Leave details not found.
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-8 text-center">Leave Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Image */}
        <div className="flex justify-center">
          <img
            src={
              leave.employeeId?.userId?.profileImage
                ? `http://localhost:4000/${leave.employeeId.userId.profileImage}`
                : "/default-avatar.png"
            }
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
        </div>

        {/* Employee Details */}
        <div>
          <div className="flex space-x-3 mb-3">
            <p className="text-lg font-bold">Name:</p>
            <p className="text-lg font-medium">
              {leave.employeeId?.userId?.name || "N/A"}
            </p>
          </div>

          <div className="flex space-x-3 mb-3">
            <p className="text-lg font-bold">Employee ID:</p>
            <p className="text-lg font-medium">
              {leave.employeeId?.employeeId || "N/A"}
            </p>
          </div>

          <div className="flex space-x-3 mb-3">
            <p className="text-lg font-bold">Leave Type:</p>
            <p className="text-lg font-medium">{leave.leaveType || "N/A"}</p>
          </div>

          <div className="flex space-x-3 mb-3">
            <p className="text-lg font-bold">Reason:</p>
            <p className="text-lg font-medium">{leave.reason || "N/A"}</p>
          </div>

          <div className="flex space-x-3 mb-3">
            <p className="text-lg font-bold">Department:</p>
            <p className="text-lg font-medium">
              {leave.employeeId?.department?.dep_name || "N/A"}
            </p>
          </div>

          <div className="flex space-x-3 mb-3">
            <p className="text-lg font-bold">Start Date:</p>
            <p className="text-lg font-medium">
              {leave.startDate
                ? new Date(leave.startDate).toLocaleDateString()
                : "N/A"}
            </p>
          </div>

          <div className="flex space-x-3 mb-3">
            <p className="text-lg font-bold">End Date:</p>
            <p className="text-lg font-medium">
              {leave.endDate
                ? new Date(leave.endDate).toLocaleDateString()
                : "N/A"}
            </p>
          </div>

          <div className="flex space-x-3 mb-3">
            <p className="text-lg font-bold">
              {leave.status === 'Pending' ? 'Action':'Status'}</p>
            {leave.status === 'Pending' ? (
              <div  className="felex space-x-2"> 
                <button className="px-2 text-gray-950 py-0.5 rounded-md bg-teal-400 hover:bg-teal-600" onClick={() => changeStatus(leave._id, 'Approved')}>Approve</button>
                <button className="px-2 text-gray-950 rounded-md py-0.5 bg-red-400  hover:bg-red-600" onClick={() => changeStatus(leave._id, 'Rejected')}>Reject</button>
              </div>
            ) : 
            <p className="text-lg font-medium">{leave.status || "N/A"}</p>
          }
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
