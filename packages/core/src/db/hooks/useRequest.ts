import { useMutation, useQuery } from "@tanstack/react-query";
import { IRequest } from "../../types";
import {
  createRequest,
  getAllRequests,
  getRequestsByUserId,
  updateRequest,
} from "../methods";
import { useRequestStore } from "../../store";

const useCreateRequest = () => {
  return useMutation(["create-request"], (data: IRequest) =>
    createRequest(data)
  );
};

const useGetAllRequests = () => {
  const { setRequests } = useRequestStore();
  return useQuery(["get-all-requests"], () => getAllRequests(), {
    onSuccess: (data) => {
      setRequests(data);
    },
  });
};

const useGetRequestByUserId = (userId: string) => {
  const { setRequests } = useRequestStore();

  return useQuery(
    ["get-request-by-userId"],
    () => getRequestsByUserId(userId),
    {
      onSuccess: (data) => {
        setRequests(data);
      },
    }
  );
};

const useUpdateRequest = () => {
  return useMutation(
    ["update-request"],
    async (data: Partial<IRequest> & Pick<IRequest, "id">) =>
      updateRequest(data)
  );
};

export {
  useCreateRequest,
  useGetAllRequests,
  useUpdateRequest,
  useGetRequestByUserId,
};
