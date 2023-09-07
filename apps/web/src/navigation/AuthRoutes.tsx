import SigninClient from "@/pages/auth/signin/SigninClient";
import SignupClient from "@/pages/auth/signup/SignupClient";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const AuthRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SigninClient />} />
        <Route path="/signin" element={<SigninClient />} />
        <Route path="/signup" element={<SignupClient />} />
      </Routes>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
    </>
  );
};

export default AuthRoutes;
