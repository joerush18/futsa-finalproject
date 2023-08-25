import { useGetAllRequests, useRequestStore } from "core";

const useRequests = () => {
  const { isLoading: isFetchingRequest } = useGetAllRequests();
  const { requests } = useRequestStore();

  return {
    requests,
    isFetchingRequest,
  };
};

export default useRequests;
