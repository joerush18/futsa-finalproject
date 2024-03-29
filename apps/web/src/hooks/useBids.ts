import { useBidsStore, useGetBidByRequestId } from "core";
import useCurrentUser from "./useCurrentUser";

const useBids = (requestId?: string) => {
  const { futsal } = useCurrentUser();
  const { isLoading: isFetchingBids } = useGetBidByRequestId(requestId ?? "");
  const { bids } = useBidsStore();

  const myBidIndex = bids.findIndex((bid) => bid.createdBy?.id === futsal?.id);
  if (myBidIndex !== -1) {
    const myBid = bids.splice(myBidIndex, 1)[0];
    bids.unshift(myBid);
  }

  const selectedIndex = bids.findIndex((bid) => bid.isSelected === true);
  if (selectedIndex !== -1) {
    const selectedBid = bids.splice(selectedIndex, 1)[0];
    bids.unshift(selectedBid);
  }

  const myBidId = bids[myBidIndex]?.id ?? "";

  return {
    bids,
    isFetchingBids,
    myBidId,
  };
};

export default useBids;
