import { create } from "zustand";
import { IRequest } from "../types";

interface RequestStore {
  requests: IRequest[];
  setRequests: (values: IRequest[]) => void;
  updateRequest: (data: Partial<IRequest> & Pick<IRequest, "id">) => void;
}

const useRequestStore = create<RequestStore>((set) => ({
  requests: [],
  setRequests: (value: IRequest[]) => {
    set((state) => ({ ...state.requests, requests: value }));
  },
  updateRequest: (data: Partial<IRequest> & Pick<IRequest, "id">) => {
    set((state) => {
      const newRequest = state.requests.map((t) => {
        if (t.id === data.id) {
          return { ...t, ...data };
        }
        return t;
      });
      return { ...state, requests: newRequest };
    });
  },
}));

export default useRequestStore;
export { useRequestStore };
