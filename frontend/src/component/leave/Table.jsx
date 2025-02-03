import React, { useEffect, useState } from "react";
import { columns, LeaveButtons } from "../../utils/LeaveHelper";
import DataTable from "react-data-table-component";
import axios from "axios";

const Table = () => {
  const [leaves, setLeaves] = useState([]);
  const [filterdLeaves, setFilteredLeaves] = useState(null);

  const fetchLeaves = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/leave`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log(response.data); // Log API response to check structure

      // Ensure leaves exist and are in an array format
      if (response.data.success && Array.isArray(response.data.leaves)) {
        const data = response.data.leaves.map((leave, index) => ({
          _id: leave._id,
          sno: index + 1,
          employeeId: leave.employeeId ? leave.employeeId.employeeId : "N/A", // Check if employeeId exists
          name: leave.employeeId?.userId?.name || "N/A", // Safe access for name
          leaveType: leave.leaveType,
          department: leave.employeeId?.department?.dep_name || "N/A", // Safe check for department
          days: Math.ceil(
            (new Date(leave.endDate) - new Date(leave.startDate)) / (1000 * 60 * 60 * 24)
          ),
          status: leave.status,
          action: <LeaveButtons Id={leave.employeeId?._id} />,
        }));
        setLeaves(data);
        setFilteredLeaves(data);
      } else {
        setLeaves([]);
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response?.data?.error) {
        alert(error.response.data.error);
      }
      setLeaves([]);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const filterByInput = (e) => {
    const data = leaves.filter((leave) =>
      leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredLeaves(data);
  };

  const filterByButton = (status) => {
    if (!leaves) return;

    const data = leaves.filter(
      (leave) => (leave.status || "").toLowerCase() === status.toLowerCase()
    );

    setFilteredLeaves(data);
  };

  return (
    <>
      {filterdLeaves ? (
        <div className="p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Manage Leaves</h2>
          </div>
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Search By Employee Id"
              className="px-4 py-1 border rounded-md"
              onChange={filterByInput}
            />
            <div className="space-x-3">
              <button
                className="px-2 py-1 bg-teal-600 text-white rounded-md hover:bg-teal-700"
                onClick={() => filterByButton("Pending")}
              >
                Pending
              </button>
              <button
                className="px-2 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
                onClick={() => filterByButton("Approved")}
              >
                Approved
              </button>
              <button
                className="px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                onClick={() => filterByButton("Rejected")}
              >
                Rejected
              </button>
            </div>
          </div>

          <DataTable columns={columns} data={filterdLeaves} pagination />
        </div>
      ) : (
        <div className="text-center mt-10">Loading...</div>
      )}
    </>
  );
};

export default Table;
