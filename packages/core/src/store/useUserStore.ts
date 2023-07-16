import { create } from "zustand";
import { IPlayers } from "core/src/types/players.types";
import { ROLES } from "core/src/types/users.types";

interface IUserStore {
  role: ROLES.PLAYER;
  player: IPlayers;
  setPlayer: (values: IPlayers) => void;
}

const useUserStore = create<IUserStore>((set) => ({
  role: ROLES.PLAYER,
  player: {} as IPlayers,
  setPlayer: (value: IPlayers) => set({ player: value }),
}));

export default useUserStore;
