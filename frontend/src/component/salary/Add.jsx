import React, { useEffect, useState } from "react";
import { fetchDepartment, getEmployees } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [salary, setSalary] = useState({
    employee: null,
    basicSalary: 0,
    allowance: 0,
    deduction: 0,
    payDate: null,
  });
  const navigate = useNavigate(); // Initialize navigate hook
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);

  // Fetch departments on mount
  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartment(); // Fetch departments
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  const handleDepartment = async (e) => {
    const departmentId = e.target.value;
    if (!departmentId) return;

    console.log("Fetching employees for department ID:", departmentId);

    try {
      const emps = await getEmployees(departmentId);
      if (emps.length === 0) {
        alert("No employees found in this department.");
      }
      setEmployees(emps);
    } catch (error) {
      console.error("Error fetching employees:", error);
      alert("Failed to fetch employees. Check console for details.");
    }
  };

  const handleEmployeeChange = (e) => {
    const selectedEmployeeId = e.target.value;
    const selectedEmployee = employees.find(
      (emp) => emp._id === selectedEmployeeId
    );

    if (selectedEmployee) {
      setSalary((prev) => ({
        ...prev,
        employee: selectedEmployeeId,
        basicSalary: selectedEmployee.basicSalary || 0,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalary((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting salary data:", salary); // Log the data before sending it
    try {
      const response = await axios.post(
        `http://localhost:4000/api/salary/add`,
        salary,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      } else {
        alert("Failed to update employee.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(
        error.response?.data?.error ||
          "An error occurred while updating employee details"
      );
    }
  };

  return (
    <>
      {departments.length > 0 ? (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-6">Add Salary</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Department */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <select
                  name="department"
                  onChange={handleDepartment}
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

              {/* Employee */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Employee
                </label>
                <select
                  name="employee"
                  onChange={handleEmployeeChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Employee</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.employeeId} - {emp.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Basic Salary */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Basic Salary
                </label>
                <input
                  type="number"
                  name="basicSalary"
                  value={salary.basicSalary}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* Allowance */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Allowance
                </label>
                <input
                  type="number"
                  name="allowance"
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* Deductions */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Deductions
                </label>
                <input
                  type="number"
                  name="deduction"
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* Pay Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pay Date
                </label>
                <input
                  type="date"
                  name="payDate"
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* Submit */}
              <div>
                <button
                  type="submit"
                  className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                >
                  Add Salary
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

export default Add;
