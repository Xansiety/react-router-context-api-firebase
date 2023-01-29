import { useEffect } from "react";
import { Outlet, useNavigate, Navigate } from "react-router";
import { useUserContext } from "../hooks/useUserContext";

const LayoutPrivate = () => {
  // const navigate = useNavigate();// with useEffect
  const { user } = useUserContext();
  // useEffect(() => { // with useEffect
  //   if (!user) {
  //     navigate("/");
  //   }
  // }, [user]);

  // return <Outlet />; // with useEffect
  return <>{user ? <Outlet /> : <Navigate to="/" />}</>;
};

export default LayoutPrivate;
