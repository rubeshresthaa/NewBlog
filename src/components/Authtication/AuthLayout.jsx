import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const AuthLayout = ({ children, authentication = true }) => {
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);
  const nav = useNavigate();

  useEffect(() => {
    // If authentication is required, check for user logged in status
    if (authentication && !authStatus) {
      nav("/login"); // Redirect to login if not authenticated
    }
    // If authentication is not required, check if user is logged in
    else if (!authentication && authStatus) {
      nav("/"); // Redirect to home if authenticated
    }
    setLoading(false); // Only stop loading after the check
  }, [authStatus, nav, authentication]);

  return loading ? <h1>Loading...</h1> : <>{children}</>;
};
