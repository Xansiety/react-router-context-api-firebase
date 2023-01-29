import { Outlet } from "react-router";

const LayoutRoot = () => {
  return (
    <>
      <nav>Navbar</nav>
      <div className="container">
        <Outlet />
      </div>
      <footer>Footer App</footer>
    </>
  );
};

export default LayoutRoot;
