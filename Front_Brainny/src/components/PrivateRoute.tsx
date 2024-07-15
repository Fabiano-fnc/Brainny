import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../services/authService'; 

interface PrivateRouteProps {
  element: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const token = getToken();
  return token ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
