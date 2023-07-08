import { useMutation } from "@tanstack/react-query";
import { updateFutsal } from "../methods/users/futsal";
import { IFutsal } from "../../types/futsals.types";

const useUpdateFutsal = () => {
  return useMutation(
    ["update-futsal"],
    async (data: Partial<IFutsal> & Pick<IFutsal, "id">) => updateFutsal(data),
    {
      onSuccess: (data) => {
        console.log("Futsal updated successfully");
        // Do something with the data if needed
      },
      onError: (error) => {
        console.log("Futsal update failed");
        // Handle the error if needed
      },
    }
  );
};

export { useUpdateFutsal };
