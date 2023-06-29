import { useMutation } from "@tanstack/react-query";
import { IPlayers } from "../../types/players.types";
import {
  createPlayerCollection,
  getCurrentUser,
} from "../methods/users/player";

const useCreateUser = (id: string) => {
  return useMutation(
    ["create-user"],
    (data: IPlayers) => createPlayerCollection(id, data),
    {
      onSuccess: (data) => {
        console.log("User created successfully");
      },
      onError: (data) => {
        console.log("User creation failed");
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
