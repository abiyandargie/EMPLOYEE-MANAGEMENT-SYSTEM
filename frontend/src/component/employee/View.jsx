import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const View = () => {
  const { id } = useParams(); // Fixed extra backslash
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setEmployee(response.data.employee); // Changed from `Employee` to `employee` (case-sensitive)
        } else {
          alert("Failed to fetch employee details");
        }
      } catch (error) {
        console.error("Error:", error);
        alert(
          error.response?.data?.error ||
            "An error occurred while fetching employee details"
        );
      }
    };

    fetchEmployee();
  }, [id]);

  return (
    <>
      {employee ? (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Employee Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile Image */}
            <div>
              <img
                src={`http://localhost:4000/${employee.userId.profileImage}`}
                width="40"
                alt="Profile image"
                className="w-full h-auto rounded-full"
              />
            </div>

            {/* Employee Details */}
            <div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Name:</p>
                <p className="text-lg font-medium">{employee.userId.name}</p>
              </div>

              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Employee ID:</p>
                <p className="text-lg font-medium">{employee.employeeId}</p>
              </div>

              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Date of Birth:</p>
                <p className="text-lg font-medium">
                  {new Date(employee.dob).toLocaleDateString()}
                </p>
              </div>

              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Gender:</p>
                <p className="text-lg font-medium">{employee.gender}</p>
              </div>

              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Department:</p>
                <p className="text-lg font-medium">
                  {employee.department?.dep_name || "N/A"}
                </p>
              </div>

              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Marital Status:</p>
                <p className="text-lg font-medium">{employee.maritalStatus}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default View;
