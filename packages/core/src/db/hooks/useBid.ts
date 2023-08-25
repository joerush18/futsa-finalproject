import { useMutation, useQuery } from "@tanstack/react-query";
import { IBids } from "../../types";
import { createBid, getBidByRequestId, updateBid } from "../methods/bids";
import { useBidsStore } from "../../store";

const useCreateBid = () => {
  return useMutation(["create-bid"], (data: IBids) => createBid(data));
};

const useGetBidByRequestId = (requestId: string) => {
  const { setBids } = useBidsStore();
  return useQuery(
    ["get-bids-by-requestId"],
    () => getBidByRequestId(requestId),
    {
      onSuccess: (data) => {
        setBids(data);
      },
    }
  );
};

const useUpdateBids = () => {
  return useMutation(
    ["update-bids"],
    async (data: Partial<IBids> & Pick<IBids, "id">) => updateBid(data)
  );
};

export { useCreateBid, useGetBidByRequestId, useUpdateBids };
