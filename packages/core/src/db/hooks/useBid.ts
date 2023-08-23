import { useMutation, useQuery } from "@tanstack/react-query";
import { IBids } from "../../types";
import { createBid, getBidByRequestId, updateBid } from "../methods/bids";

const useCreateBid = () => {
  return useMutation(["create-bid"], (data: IBids) => createBid(data));
};

const useGetBidByRequestId = (requestId: string) => {
  //   const { setBookings } = useBookingStore();
  return useQuery(
    ["get-bids-by-requestId"],
    () => getBidByRequestId(requestId),
    {
      onSuccess: () => {
        // setBookings(data);
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
