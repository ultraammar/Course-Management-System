import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';    

// eslint-disable-next-line react/prop-types
function RedirectIfLoggedIn({ children }) {
    const isLoggedIn = useSelector((state) => state.session.isLoggedIn);
  
    if (isLoggedIn) {
      return <Navigate to="/" replace />;
    }
  
    return children;
  }

export default RedirectIfLoggedIn