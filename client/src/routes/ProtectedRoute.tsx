import { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";

/** @ts-ignore */
export const ProtectedRoute:FC<PropsWithChildren> = ({ children }) => {
  const [token]= useLocalStorage('token', null);
  if (!token) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};