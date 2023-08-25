import { useBidsStore, useGetBidByRequestId } from "core";
import useCurrentUser from "./useCurrentUser";

const useBids = (requestId?: string) => {
  const { futsal } = useCurrentUser();
  const { isLoading: isFetchingBids } = useGetBidByRequestId(requestId ?? "");
  const { bids } = useBidsStore();

  const selectedIndex = bids.findIndex((bid) => bid.isSelected === true);
  if (selectedIndex !== -1) {
    const selectedBid = bids.splice(selectedIndex, 1)[0];
    bids.unshift(selectedBid);
  }

  const myBidIndex = bids.findIndex((bid) => bid.createdBy?.id === futsal?.id);
  if (myBidIndex !== -1) {
    const myBid = bids.splice(myBidIndex, 1)[0];
    bids.unshift(myBid);
  }

  return {
    bids,
    isFetchingBids,
    myBidIndex: myBidIndex !== -1 ? true : false,
  };
};

export default useBids;
