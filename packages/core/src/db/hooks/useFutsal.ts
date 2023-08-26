import { useMutation, useQuery } from "@tanstack/react-query";
import { updateFutsal } from "../methods/users/futsal";
import { IFutsal } from "../../types";
import { getAllFutsals } from "../methods/futsals";
import { useFutsalsStore } from "../../store";

const useUpdateFutsal = () => {
  return useMutation(
    ["update-futsal"],
    async (data: Partial<IFutsal> & Pick<IFutsal, "id">) => updateFutsal(data)
  );
};

const useGetAllFutsal = () => {
  const { setFutsals } = useFutsalsStore();
  return useQuery(["get-all-futsal"], async () => getAllFutsals({}), {
    onSuccess: (data) => {
      setFutsals(data);
    },
  });
};

export { useUpdateFutsal, useGetAllFutsal };
