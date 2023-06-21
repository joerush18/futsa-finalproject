import { useMutation, useQuery } from "@tanstack/react-query";
import { emailSignUp, emailLogin, logout } from "../methods/auth/auth";
import { ISignUpCredentials } from "../../types/users.types";

const useSignupEmail = () => {
  return useMutation(
    ["signup-email"],
    (data: ISignUpCredentials) => emailSignUp(data),
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (data) => {
        console.log(data);
      },
    }
  );
};

const useLoginEmail = () => {
  return useMutation(
    ["login-email"],
    (data: Pick<ISignUpCredentials, "email" | "password">) => emailLogin(data),
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (data) => {
        console.log(data);
      },
    }
  );
};

const useLogout = () => {
  return useMutation(["login-email"], logout, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (data) => {
      console.log(data);
    },
  });
};

export { useSignupEmail, useLoginEmail, useLogout };
