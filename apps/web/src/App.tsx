import AuthRoutes from "@/navigation/AuthRoutes";
import "./global.css";
import DashboardRoutes from "./navigation/DashboardRoutes";
import useCurrentUser from "./hooks/useCurrentUser";
import Loading from "./components/Loading";

function Routes() {
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

const App = () => {
  return <Routes />;
};

export default App;
