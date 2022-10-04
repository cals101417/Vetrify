import React from 'react';
import { useAuth } from './UserAuthContext';
import { Navigate } from 'react-router-dom';

function Unprotected_route({children}) {
  const { user, loading } = useAuth();
    if (loading)
    return (
      <>
        <p>...</p>
      </>
    );

  if (!user) {
    return <>{children}</>;
  } else {
    return <Navigate to="/Home" />;
  }

}

export default Unprotected_route;