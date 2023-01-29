import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const LayoutRoot = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
      <footer>Footer App</footer>
    </>
  );
};

export default LayoutRoot;
