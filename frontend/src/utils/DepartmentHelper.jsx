import { useNavigate } from "react-router-dom";
import axios from "axios";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
  },
  {
    name: "Department Name",
    selector: (row) => row.dp_name,
    sortable: true,
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

export const DepartmentButtons = ({ _id, onDepartmentDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirm = window.confirm("Do you want to delete this department?");
    if (confirm) {
      try {
        const response = await axios.delete(
          `http://localhost:4000/api/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          onDepartmentDelete();
        } else {
          alert("Failed to delete department");
        }
      } catch (error) {
        console.error("Error:", error);
        alert(
          error.response?.data?.error ||
            "An error occurred while deleting the department"
        );
      }
    }
  };

  return (
    <div className="flex space-x-3 text-white">
      <button
        className="px-3 py-1 bg-teal-600 rounded"
        onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
      >
        Edit
      </button>
      <button
        className="px-3 py-1 bg-red-600 rounded"
        onClick={() => handleDelete(_id)} // Pass the ID directly here
      >
        Delete
      </button>
    </div>
  );
};
