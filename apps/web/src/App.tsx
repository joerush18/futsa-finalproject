import AuthRoutes from "@/navigation/AuthRoutes";
import "./global.css";
import DashboardRoutes from "./navigation/DashboardRoutes";
import useCurrentUser from "./hooks/useCurrentUser";

function App() {
  const { isAuth, futsal, isLoading } = useCurrentUser();

  console.log({ futsal });

  if (isLoading && !futsal) {
    return <div>Loading...</div>;
  }
  if (!isAuth) {
    return <AuthRoutes />;
  }
  return <DashboardRoutes />;
}

export default App;
