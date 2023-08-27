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
  myRequests: IRequest[];
}

const useRequests = () => {
  const { user } = useCurrentUser();
  const { isLoading, refetch } = useGetAllRequests();
  const { requests } = useRequestStore();

  const req = requests.reduce<RequestsByStatus>(
    (acc, request) => {
      if (request.status === REQUEST_STATUS.ACTIVE) {
        acc.active.push(request);
        if (request?.createdBy?.id === user?.id) {
          acc.myRequests.push(request);
        }
      } else if (request.status === REQUEST_STATUS.ACCEPTED) {
        acc.completed.push(request);
        if (request?.createdBy?.id === user?.id) {
          acc.myRequests.push(request);
        }
      }
      return acc;
    },
    { active: [], completed: [], myRequests: [] }
  );

  const { onRefresh, refreshing } = useRefetch(refetch);

  return {
    active: req.active,
    completed: req.completed,
    myReqeusts: req.myRequests,
    isfetchingRequests: isLoading,
    refetch,
    onRefresh,
    refreshing,
  };
};

export default useRequests;
