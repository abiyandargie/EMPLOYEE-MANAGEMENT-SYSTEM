import React from 'react';
import { useAuth } from '../context/authContext';
import { Navigate } from 'react-router-dom';

const RoleBaseRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!requiredRole.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }
  console.log('User:', user);
  return children;
};

export default RoleBaseRoute;