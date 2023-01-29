import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useUserContext } from "../hooks/useUserContext";

const LayoutPrivate = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  return <Outlet />;
};

export default LayoutPrivate;
