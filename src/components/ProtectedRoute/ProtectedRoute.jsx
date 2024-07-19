import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.session.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  else{
    return children;
  }

};
export default ProtectedRoute;