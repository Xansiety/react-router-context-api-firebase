import { Outlet } from "react-router"; 

const LayoutRoot = () => {
  return (
    <>
      <div className="container">
        <Outlet />
      </div>
    </>
  );
};

export default LayoutRoot;
