import React, { useEffect, useState } from "react";
import { fetchDepartment } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const [employee, setEmployee] = useState({
    name: '',
    maritalStatus: '',
    designation: '',
    salary: 0,
    department: ''
  });
  const navigate = useNavigate(); // Initialize navigate hook
  const [departments, setDepartments] = useState([]);
  const { id } = useParams();

  // Fetch departments on mount
  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartment(); // Fetch departments
      setDepartments(departments);
    };
    getDepartments();
  }, []);
useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
  
        // Log the entire response to check its structure
        console.log("Employee Response:", response.data);
  
        if (response.data.success) {
          const employee = response.data.employee;
  
          // Log the employee object to check its structure
          console.log("Employee Object:", employee);
  
          // Check if the 'userId' field exists and set the employee state accordingly
          if (employee && employee.userId) {
            setEmployee({
              name: employee.userId.name || '', // Access the name from userId
              maritalStatus: employee.maritalStatus || '',
              designation: employee.designation || '',
              salary: employee.salary || 0,
              department: employee.department?._id || '', // Default empty if department is not set
            });
          } else {
            alert("Employee name is missing in the data.");
          }
        } else {
          alert('Failed to fetch employee details');
        }
      } catch (error) {
        console.error('Error:', error);
        alert(error.response?.data?.error || 'An error occurred while fetching employee details');
      }
    };
  
    fetchEmployee();
  }, [id]);
  
  // Handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission to update employee data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:4000/api/employee/${id}`,
        employee, // Send the updated employee object directly
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/employees"); // Navigate to employees page on success
      } else {
        alert("Failed to update employee.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error.response?.data?.error || "An error occurred while updating employee details");
    }
  };

  return (
    <>
      {departments.length > 0 && employee ? (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-6">Edit Employee</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={employee.name}
                  onChange={handleChange}
                  placeholder="Enter name"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* Marital Status */}
              <div>
                <label htmlFor="maritalStatus" className="block text-sm font-medium text-gray-700">
                  Marital Status
                </label>
                <select
                  name="maritalStatus"
                  value={employee.maritalStatus}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                </select>
              </div>

              {/* Designation */}
              <div>
                <label htmlFor="designation" className="block text-sm font-medium text-gray-700">
                  Designation
                </label>
                <input
                  type="text"
                  name="designation"
                  value={employee.designation}
                  onChange={handleChange}
                  placeholder="Designation"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* Salary */}
              <div>
                <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
                  Salary
                </label>
                <input
                  type="text"
                  name="salary"
                  value={employee.salary}
                  onChange={handleChange}
                  placeholder="Salary"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* Department */}
              <div className="col-span-2">
                <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <select
                  name="department"
                  value={employee.department}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map((dep) => (
                    <option key={dep._id} value={dep._id}>
                      {dep.dep_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit */}
              <div>
                <button
                  type="submit"
                  className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                >
                  Edit Employee
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Edit;
