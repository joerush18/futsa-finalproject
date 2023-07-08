import AuthRoutes from "@/navigation/AuthRoutes";
import "./global.css";
import DashboardRoutes from "./navigation/DashboardRoutes";
import useCurrentUser from "./hooks/useCurrentUser";
import Loading from "./components/Loading";

function App() {
  const { isAuth, isLoading } = useCurrentUser();

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuth) {
    return <AuthRoutes />;
  } else {
    return <DashboardRoutes />;
  }
}

export default App;
