import React, { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = () => {
  const { isAuthenticated, loading, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('ProtectedRoute - Auth State:', { 
      isAuthenticated, 
      loading, 
      currentUser 
    });
  }, [isAuthenticated, loading, currentUser]);

  // Show loading indicator while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  // Render child routes if authenticated
  console.log('User is authenticated, rendering protected content');
  return <Outlet />;
};

export default ProtectedRoute; 