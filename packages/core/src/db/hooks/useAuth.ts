import { useMutation } from "@tanstack/react-query";
import { emailSignUp, emailLogin, logout } from "../methods/auth/auth";
import { ISignUpCredentials } from "../../types/users.types";
import { saveToken } from "../../utils/token";

const useSignupEmail = () => {
  return useMutation(
    ["signup-email"],
    (data: ISignUpCredentials) => emailSignUp(data),
    {
      onSuccess: (data) => {
        saveToken(data.uid);
      },
      onError: (data) => {
        return data;
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
        saveToken(data.uid);
      },
      onError: (data) => {
        console.log({ data });
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
