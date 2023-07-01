import SigninClient from "@/pages/auth/signin/SigninClient";
import SignupClient from "@/pages/auth/signup/SignupClient";
import { Routes, Route } from "react-router-dom";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/">
        <Route path="/" element={<SigninClient />} />
        <Route path="/signup" element={<SignupClient />} />
        <Route path="/signin" element={<SigninClient />} />
      </Route>
    </Routes>
  );
};

export default AuthRoutes;
