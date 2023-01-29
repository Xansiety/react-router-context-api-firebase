import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  console.log(useContext(UserContext));
  return (
    <nav>
      <NavLink to="/">Home</NavLink> |
      <NavLink to="/dashboard">Dashboard</NavLink>
    </nav>
  );
};

export default Navbar;
