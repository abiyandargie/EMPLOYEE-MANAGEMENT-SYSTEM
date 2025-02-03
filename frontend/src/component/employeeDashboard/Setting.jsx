import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import axios from "axios";

const Setting = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [setting, setSetting] = useState({
    userId: user._id,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSetting({ ...setting, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Request Payload:", setting); // Debug log

    if (setting.newPassword !== setting.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (
      !setting.oldPassword ||
      !setting.newPassword ||
      !setting.confirmPassword
    ) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await axios.put(
        "http://localhost:4000/api/setting/change-password",
        setting,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Server Response:", response.data); // Debug log

      if (response.data.success) {
        setSuccessMessage("Password updated successfully!");
        setTimeout(() => {
          // Navigate based on user role
          if (user.role === "admin") {
            navigate("/admin-dashboard"); // Navigate to admin dashboard
          } else if (user.role === "employee") {
            navigate("/employee-dashboard"); // Navigate to employee dashboard
          }
        }, 2000); // Wait 2 seconds before navigating
      } else {
        setError(response.data.error || "An error occurred");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      console.log("Server Response:", error.response?.data); // Debug log
      setError(
        error.response?.data?.error ||
          "An error occurred while changing the password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center mt-10 bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Change Password</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {successMessage && (
          <p className="text-green-500 text-center mb-4">{successMessage}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="oldPassword"
              className="text-sm font-medium text-gray-700"
            >
              Old Password
            </label>
            <input
              type="password"
              name="oldPassword"
              placeholder="Old Password"
              value={setting.oldPassword}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={setting.newPassword}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={setting.confirmPassword}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? "Changing Password..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Setting;
