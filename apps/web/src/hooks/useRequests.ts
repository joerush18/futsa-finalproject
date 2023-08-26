import { useGetAllRequests, useRequestStore } from "core";

const useRequests = () => {
  const { isLoading: isFetchingRequest, refetch } = useGetAllRequests();
  const { requests } = useRequestStore();

  return {
    requests,
    isFetchingRequest,
    refetch,
  };
};

export default useRequests;
