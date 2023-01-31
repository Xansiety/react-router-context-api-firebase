import { logOutAuth } from "../config/firebase";
import { useUserContext } from "../hooks/useUserContext";

const Dashboard = () => {
  const { user } = useUserContext();

  const handleLogout = async () => {
    try {
      await logOutAuth();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>Dashboard</h1>
      <h2>Bienvenido: {user.email}</h2>

      <button onClick={handleLogout}>LogOut</button>
    </>
  );
};

export default Dashboard;
