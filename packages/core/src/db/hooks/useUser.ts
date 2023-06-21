import { useMutation, useQuery } from "@tanstack/react-query";
import { IUser } from "../../types/users.types";
import { createUserCollection, getCurrentUser } from "../methods/users/users";

const useCreateUser = (id: string) => {
  return useMutation(
    ["create-user"],
    (data: IUser) => createUserCollection(id, data),
    {
      onSuccess: (data) => {
        console.log("User created successfully");
      },
      onError: (data) => {
        console.log("USer creation failed");
      },
    }
  );
};

const useGetUser = () => {
  return useMutation(["get-user"], (id: string) => getCurrentUser(id), {
    onSuccess: (data) => {},
    onError: (data) => {},
  });
};

export { useCreateUser, useGetUser };
