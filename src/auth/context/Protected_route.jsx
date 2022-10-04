import React from 'react';
import { useAuth } from './UserAuthContext';
import { Navigate } from 'react-router-dom';

function Protected_route({ children }) {
     const { user, loading } = useAuth();

    if (loading)
      return (
        <>
          <p>...</p>
        </>
      );
  
    if (!user) {
      return <Navigate to="/" />;
    }
    return <>{children}</>;
}

export default Protected_route;