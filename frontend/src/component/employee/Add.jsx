import React, { useEffect, useState } from "react";
import { fetchDepartment } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Added navigate import

const Add = () => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate(); // Initialize navigate hook

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartment(); // Fetch departments
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData, // Retain existing data
      [name]: name === "image" ? files[0] : value, // Update specific field
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Corrected formData to FormData (capital 'F') 
    const formDataObj = new FormData(); 
    // Append all form fields to FormData object
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    try {
      const response = await axios.post(
        "http://localhost:4000/api/employee/add",
        formDataObj,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data", // Correct Content-Type for file uploads
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/employees");  
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Input fields */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="enter name"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="enter email"
              onChange={handleChange}
              className="mt-1 p-2 block border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700">
              Employee Id
            </label>
            <input
              type="text"
              name="employeeId"
              placeholder="employee Id"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-none"
              required
            />
          </div>

          <div>
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
              Date of birth
            </label>
            <input
              type="date"
              name="dob"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              name="gender"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-none"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="maritalStatus" className="block text-sm font-medium text-gray-700">
              Marital Status
            </label>
            <select
              name="maritalStatus"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-none"
              required
            >
              <option value="">Select Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
          </div>

          <div>
            <label htmlFor="designation" className="block text-sm font-medium text-gray-700">
              Designation
            </label>
            <input
              type="text"
              name="designation"
              onChange={handleChange}
              placeholder="Designation"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-none"
              required
            />
          </div>

          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700">
              Department
            </label>
            <select
              name="department"
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

          <div>
            <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
              Salary
            </label>
            <input
              type="text"
              name="salary"
              placeholder="Salary"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-none"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="******"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-none"
              required
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Select Role
            </label>
            <select
              name="role"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-none"
              required
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Upload Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-none"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Employee
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Add;
