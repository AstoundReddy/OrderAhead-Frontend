import React, { useContext, useEffect } from "react";
import { Route, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ path, ...props }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && ((user?.restaurantId && !path.startsWith("/manager")) || (!user?.restaurantId && path.startsWith("/manager")))) {
      navigate(user?.restaurantId ? "/manager/login" : "/login");
    }
  }, [user, navigate, path]);

  return <Route path={path} {...props} />;
};

export default ProtectedRoute;
