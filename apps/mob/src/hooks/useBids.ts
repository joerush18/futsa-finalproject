import { useBidsStore, useGetBidByRequestId } from "core";
import useRefetch from "./useRefetch";

const useBids = (requestId?: string) => {
  const { isLoading: isFetchingBids, refetch } = useGetBidByRequestId(
    requestId ?? ""
  );
  const { bids } = useBidsStore();
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
