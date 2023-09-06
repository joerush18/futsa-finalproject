import {
  IRequest,
  REQUEST_STATUS,
  useGetAllRequests,
  useRequestStore,
} from "core";
import useCurrentUser from "./useCurrentUser";
import useRefetch from "./useRefetch";

interface RequestsByStatus {
  active: IRequest[];
  completed: IRequest[];
  allRequests: IRequest[];
}

const useRequests = () => {
  const { user } = useCurrentUser();
  const { isLoading, refetch } = useGetAllRequests();
  const { requests } = useRequestStore();

  const req = requests.reduce<RequestsByStatus>(
    (acc, request) => {
      if (request.createdBy?.id === user?.id) {
        if (request.status === REQUEST_STATUS.ACCEPTED) {
          acc.completed.push(request);
        } else {
          acc.active.push(request);
        }
      } else {
        if (request.status === REQUEST_STATUS.ACTIVE) {
          acc.allRequests.push(request);
        }
      }
      return acc;
    },
    { active: [], completed: [], allRequests: [] }
  );

  const { onRefresh, refreshing } = useRefetch(refetch);

  return {
    active: req.active,
    completed: req.completed,
    allRequests: req.allRequests,
    isfetchingRequests: isLoading,
    refetch,
    onRefresh,
    refreshing,
  };
};

export default useRequests;
