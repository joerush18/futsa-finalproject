import { useMutation, useQuery } from "@tanstack/react-query";
import { updateFutsal } from "../methods/users/futsal";
import { IFutsal } from "../../types";
import { getAllFutsals } from "../methods/futsals";
import { useFutsalsStore } from "../../store";

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

const useGetAllFutsal = () => {
  const { setFutsals } = useFutsalsStore();
  return useQuery(["get-all-futsal"], async () => getAllFutsals({}), {
    onSuccess: (data) => {
      setFutsals(data);
      console.log("Futsal fetched successfully");
      // Do something with the data if needed
    },
    onError: (error) => {
      console.log("Futsal fetch failed");
      // Handle the error if needed
    },
  });
};

export { useUpdateFutsal, useGetAllFutsal };
