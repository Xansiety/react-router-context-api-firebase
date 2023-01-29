import { useNavigate } from "react-router";
import { useUserContext } from "../hooks/useUserContext";

const Home = () => {
  const { setUser } = useUserContext();

  const navigate = useNavigate();

  const handleLogin = () => {
    setUser({
      name: 'xan',
      email: 'test@tes.com'
    });
    navigate("/dashboard");
  };

  return (
    <>
      <h1>Home</h1>
      <button onClick={handleLogin}>Login</button>
    </>
  );
};

export default Home;
