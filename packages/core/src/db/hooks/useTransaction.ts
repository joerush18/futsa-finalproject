import { useQuery } from "@tanstack/react-query";
import { getTrasactionsByFutsal, getTrasactionsByUser } from "../methods";

const useGetTransactionByFutsal = (futsalId: string) => {
  return useQuery(["get-Transaction-by-futsalId"], () =>
    getTrasactionsByFutsal(futsalId)
  );
};

const useGetTransactionByUser = (userId: string) => {
  return useQuery(["get-Transaction-by-userId"], () =>
    getTrasactionsByUser(userId)
  );
};

export { useGetTransactionByFutsal, useGetTransactionByUser };
