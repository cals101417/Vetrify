import React from "react";
import { useAuth } from "./UserAuthContext";
import { Navigate } from "react-router-dom";

function Protected_route({ children }) {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <>
        <div
          style={{ position: "fixed", zIndex: 1031, top: "50%", left: "50%" }}
        >
          <div class="spinner-border" role="status">
            <span class="visually-hidden"></span>
          </div>
        </div>
      </>
    );

  if (!user) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
}

export default Protected_route;
