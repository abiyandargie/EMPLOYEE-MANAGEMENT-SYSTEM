import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "70px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "100px",
    center: true,
  },
  {
    name: "Image",
    selector: (row) => row.profileImage,
    width: "90px",
  },
  {
    name: "Department",
    selector: (row) => row.dp_name,
    width: "120px",
    center: true,
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable: true,
    width: "130px",
    center: true,
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center: true,
  },
];

export const fetchDepartment = async () => {
  try {
    const response = await axios.get("http://localhost:4000/api/department", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.data.success) {
      return response.data.departments;
    } else {
      alert("Failed to fetch departments");
      return [];
    }
  } catch (error) {
    console.error("Error fetching departments:", error);
    alert(
      error.response?.data?.error ||
        "An error occurred while fetching department details"
    );
    return [];
  }
};

export const getEmployees = async (id) => {
  console.log("Fetching employees for department ID:", id);
  if (!id || id.length !== 24) {
    console.error("Invalid department ID, request aborted:", id);
    return [];
  }

  try {
    const response = await axios.get(
      `http://localhost:4000/api/employee/department/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.success) {
      return response.data.employees;
    } else {
      alert("Failed to fetch employees");
      return [];
    }
  } catch (error) {
    console.error("Error fetching employees:", error);
    alert(
      error.response?.data?.error ||
        "An error occurred while fetching employee details"
    );
    return [];
  }
};

// export const EmployeeButtons = ({ _id }) => {
//   const navigate = useNavigate();

//   return (
//     <div className="flex space-x-3 text-white">
//       <button
//         className="px-3 py-1 bg-teal-600 rounded"
//         onClick={() => navigate(`/admin-dashboard/employees/${_id}`)}
//       >
//         View
//       </button>
//       <button
//         className="px-3 py-1 bg-blue-600 rounded"
//         onClick={() => navigate(`/admin-dashboard/employees/edit/${_id}`)}
//       >
//         Edit
//       </button>
//       <button
//         className="px-3 py-1 bg-yellow-600 rounded"
//         onClick={() => navigate(`/admin-dashboard/salary/${_id}`)}
//       >
//         Salary
//       </button>
//       <button className="px-3 py-1 bg-red-500 rounded" onClick={()=>navigate(`/admin-dashboard/employees/leaves/${_id}`)}>Leave</button>
//     </div>
//   );
// };
export const EmployeeButtons = ({ _id }) => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Get logged-in user details

  return (
    <div className="flex space-x-3 text-white">
      <button
        className="px-3 py-1 bg-teal-600 rounded"
        onClick={() => navigate(`/admin-dashboard/employees/${_id}`)}
      >
        View
      </button>
      <button
        className="px-3 py-1 bg-blue-600 rounded"
        onClick={() => navigate(`/admin-dashboard/employees/edit/${_id}`)}
      >
        Edit
      </button>
      <button
        className="px-3 py-1 bg-yellow-600 rounded"
        onClick={() => navigate(`/admin-dashboard/employees/salary/${_id}`)}
      >
        Salary
      </button>
      <button
        className="px-3 py-1 bg-red-500 rounded"
        onClick={() =>
          user.role === "admin"
            ? navigate(`/admin-dashboard/employees/leaves/${_id}`)
            : navigate(`/employee-dashboard/leaves`)
        }
      >
        Leave
      </button>
    </div>
  );
};
