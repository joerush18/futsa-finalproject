import { useMutation, useQuery } from "@tanstack/react-query";
import { IRequest } from "../../types";
import {
  createRequest,
  getAllRequests,
  getRequestsByUserId,
  updateRequest,
} from "../methods";

const useCreateRequest = () => {
  return useMutation(["create-request"], (data: IRequest) =>
    createRequest(data)
  );
};

const useGetAllRequests = () => {
  //   const { setBookings } = useBookingStore();
  return useQuery(["get-all-requests"], () => getAllRequests(), {
    onSuccess: () => {
      // setBookings(data);
    },
  });
};

const useGetRequestByUserId = (userId: string) => {
  //   const { setBookings } = useBookingStore();
  return useQuery(
    ["get-request-by-userId"],
    () => getRequestsByUserId(userId),
    {
      onSuccess: (data) => {
        // setBookings(data);
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
