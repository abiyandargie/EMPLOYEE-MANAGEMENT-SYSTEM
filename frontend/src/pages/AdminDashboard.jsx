import React from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../component/dashboard/AdminSidebar';
import Navbar from '../component/dashboard/Navbar';
import { Outlet } from 'react-router-dom'; // Import Outlet

const AdminDashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading.....</div>;
  }

  if (!user) {
    navigate('/login');
    return null; // Prevent further rendering
  }

  return (
    <div className='flex'>
      <AdminSidebar />
      <div className='flex-1 ml-64 justify-center h-screen bg-gray-100'>
        <Navbar />
        <Outlet /> {/* This will render the nested route */}
      </div>
    </div>
  );
};

export default AdminDashboard;