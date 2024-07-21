import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const session = useSelector((state) => state.session);
  const location = useLocation(); // Use useLocation to get the current location
  console.log("isLoggedIn", session.isLoggedIn);

  if (!session.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  else if (location.pathname.includes(`/${session.userType}s/`)){
    return children;
  }
  else{
    return <Navigate to={`/${session.userType}s/`} replace />;
  }

};
export default ProtectedRoute;