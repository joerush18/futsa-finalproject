import { create } from "zustand";
import { IMember } from "../types";

interface MembersStore {
  members: IMember[];
  setMembers: (values: IMember[]) => void;
  updateMember: (data: Partial<IMember> & Pick<IMember, "id">) => void;
}

const useMemberStore = create<MembersStore>((set) => ({
  members: [],
  setMembers: (value: IMember[]) => {
    set((state) => ({ ...state.members, members: value }));
  },
  updateMember: (data: Partial<IMember> & Pick<IMember, "id">) => {
    set((state) => {
      const newMem = state.members.map((mem) => {
        if (mem.id === data.id) {
          return { ...mem, ...data };
        }
        return mem;
      });
      return { ...state, members: newMem };
    });
  },
}));

export default useMemberStore;
export { useMemberStore };
