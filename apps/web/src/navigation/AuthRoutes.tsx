import SigninClient from "@/pages/auth/signin/SigninClient";
import SignupClient from "@/pages/auth/signup/SignupClient";
import { Route, Routes } from "react-router-dom";

const AuthRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SigninClient />} />
        <Route path="/signin" element={<SigninClient />} />
        <Route path="/signup" element={<SignupClient />} />
      </Routes>
    </>
  );
};

export default AuthRoutes;
