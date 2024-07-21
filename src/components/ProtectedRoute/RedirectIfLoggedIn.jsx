import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';    

// eslint-disable-next-line react/prop-types
function RedirectIfLoggedIn({ children }) {
    const session = useSelector((state) => state.session);
  
    if (session.isLoggedIn) {
      if(session.userType === "admin"){
        return <Navigate to="/admins/manage-authors" replace />;
      }
      else if (session.userType === "teacher"){
        return <Navigate to="/teachers/manage-courses" replace/>
      }
    }
  
    return children;
  }

export default RedirectIfLoggedIn