import { useBidsStore, useGetBidByRequestId } from "core";
import useRefetch from "./useRefetch";

const useBids = (requestId?: string) => {
  const { isLoading: isFetchingBids, refetch } = useGetBidByRequestId(
    requestId ?? ""
  );
  const { bids } = useBidsStore();
  const selectedIndex = bids.findIndex((bid) => bid.isSelected === true);
  if (selectedIndex !== -1) {
    const selectedBid = bids.splice(selectedIndex, 1)[0];
    bids.unshift(selectedBid);
  }
  const { onRefresh, refreshing } = useRefetch(refetch);

  return {
    bids,
    isFetchingBids,
    onRefresh,
    refreshing,
    refetch,
  };
};

export default useBids;
