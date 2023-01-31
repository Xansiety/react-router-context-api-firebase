import { Outlet } from "react-router";
import { Container } from "@mui/material";

const LayoutRoot = () => {
  return (
    <>
      <Container maxWidth="md">
        <Outlet />
      </Container>
    </>
  );
};

export default LayoutRoot;
