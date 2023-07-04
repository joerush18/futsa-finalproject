import AuthRoutes from "@/navigation/AuthRoutes";
import "./global.css";
import DashboardRoutes from "./navigation/DashboardRoutes";
import useCurrentUser from "./hooks/useCurrentUser";
import Loading from "@/components/Loading";

function App() {
  const { isAuth, futsal, isLoading } = useCurrentUser();

  if (isLoading && futsal === undefined && !isAuth) {
    return <Loading />;
  }

  if (!isAuth) {
    return <AuthRoutes />;
  } else {
    return <DashboardRoutes />;
  }
}

export default App;
