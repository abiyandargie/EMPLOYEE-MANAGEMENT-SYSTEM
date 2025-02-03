import React from 'react';
import { useAuth } from '../context/authContext';
import Sidebar from '../component/employeeDashboard/Sidebar';
import { Outlet } from 'react-router-dom';
import Navbar from '../component/dashboard/Navbar';
import SummaryCard from '../component/employeeDashboard/Summary';

const EmployeeDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 justify-center h-screen bg-gray-100">
        <Navbar />
        <Outlet /> {/* This will render the nested route */}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
