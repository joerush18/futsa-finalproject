import { useGetRequestByUserId } from "core";
import useCurrentUser from "./useCurrentUser";

const useRequests = () => {
  const { user } = useCurrentUser();
  const { data, isLoading } = useGetRequestByUserId(user?.id ?? "");
  return {
    requests: data ?? [],
    isfetchingRequests: isLoading,
  };
};

export default useRequests;
