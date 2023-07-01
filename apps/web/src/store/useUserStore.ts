import { create } from "zustand";
import { IFutsal } from "core/src/types/futsals.types";
import { ROLES } from "core/src/types/users.types";

interface IUserStore {
  role: ROLES.FUTSAL;
  futsal: IFutsal;
  setFutsal: (values: IFutsal) => void;
}

const useUserStore = create<IUserStore>((set) => ({
  role: ROLES.FUTSAL,
  futsal: {} as IFutsal,
  setFutsal: (value: IFutsal) => set({ role: ROLES.FUTSAL, futsal: value }),
}));

export default useUserStore;
