import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { EmployeeButtons } from "../EmployeeHelper.jsx";
import DataTable from "react-data-table-component";
import axios from "axios";
import { columns, EmployeeButtons } from "../../utils/EmployeeHelper.jsx";

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get("http://localhost:4000/api/employee", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // Log the full response to check the structure
        console.log(response.data);

        // Check if employees exists and is an array
        if (response.data.success && Array.isArray(response.data.employees)) {
          let sno = 1;
          const data = response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++, // Ensure that 'sno' is being incremented correctly
            dp_name: emp.department ? emp.department.dep_name : "No Department", // Handle department name
            name: emp.userId.name,
            dob: new Date(emp.dob).toLocaleDateString(),
            profileImage: (
              <img
                width={40}
                className="rounded-full"
                src={`http://localhost:4000/${
                  emp.userId.profileImage || "default-avatar.jpg"
                }`}
                alt="Profile"
              />
            ),
            action: <EmployeeButtons _id={emp._id} />, // Ensure _id matches the EmployeeButtons prop
          }));
          setEmployees(data);
          setFilteredEmployees(data);
        } else {
          console.error(
            "Employees data is not an array:",
            response.data.employees
          );
          setEmployees([]); // If employees is not an array, reset employees
          setFilteredEmployees([]); // Same for filteredEmployees
        }
      } catch (error) {
        console.error("Error:", error);
        if (error.response?.data?.error) {
          alert(error.response.data.error);
        }
        setEmployees([]); // Handle error gracefully by resetting employees to an empty array
        setFilteredEmployees([]); // Reset filteredEmployees
      } finally {
        setEmpLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleFilter = (e) => {
    const records = employees.filter(
      (emp) =>
        emp.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        emp.dp_name.toLowerCase().includes(e.target.value.toLowerCase()) // Filter by department name as well
    );
    setFilteredEmployees(records);
  };

  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Employees</h3>
      </div>
      <div className="flex justify-between items-center">
        <input
          type="text"
          onChange={handleFilter}
          placeholder="Search by employee name or department name"
          className="px-4 py-0.5 border"
        />
        <Link
          to="/admin-dashboard/add-employee"
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          Add New Employee
        </Link>
      </div>

      <div className="mt-6">
        <DataTable
          columns={columns}
          data={filteredEmployees} // Use filteredEmployees for displaying the data
          pagination
          progressPending={empLoading} // Show loading spinner while data is loading
          progressComponent="Loading..." // Customize the loading text
        />
      </div>
    </div>
  );
};

export default List;
