import {
  IRequest,
  REQUEST_STATUS,
  useGetRequestByUserId,
  useRequestStore,
} from "core";
import useCurrentUser from "./useCurrentUser";

interface RequestsByStatus {
  active: IRequest[];
  completed: IRequest[];
}

const useRequests = () => {
  const { user } = useCurrentUser();
  const { isLoading, refetch } = useGetRequestByUserId(user?.id ?? "");
  const { requests } = useRequestStore();

  const req = requests.reduce<RequestsByStatus>(
    (acc, request) => {
      if (request.status === REQUEST_STATUS.ACTIVE) {
        acc.active.push(request);
      } else {
        acc.completed.push(request);
      }
      return acc;
    },
    { active: [], completed: [] }
  );

  return {
    completedRequests: req.completed,
    activeRequests: req.active,
    isfetchingRequests: isLoading,
    refetch,
  };
};

export default useRequests;
