import { useMutation } from "@tanstack/react-query";
import { IPlayers } from "../../types/players.types";
import {
  createPlayerCollection,
  getCurrentPlayer,
} from "../methods/users/player";
import { ROLES } from "../../types/users.types";
import { getCurrentFutsal } from "../methods/users/futsal";

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
  return useMutation(
    ["get-user"],
    async (data: { id: string; role: ROLES }) => {
      const { id, role } = data;
      let response;
      if (role === ROLES.FUTSAL) {
        response = await getCurrentFutsal(id, role);
      } else {
        response = await getCurrentPlayer(id, role);
      }
      return response.data; // Assuming `getCurrentUser` returns a promise that resolves to the user data
    },
    {
      onSuccess: (data) => {
        // Do something with the data if needed
      },
      onError: (error) => {
        console.log("User retrieval failed");
        // Handle the error if needed
      },
    }
  );
};
export { useCreateUser, useGetUser };
