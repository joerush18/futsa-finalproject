import { create } from "zustand";
import { ITeam } from "../types";

interface TeamsStore {
  teams: ITeam[];
  setTeams: (values: ITeam[]) => void;
}

const useTeamsStore = create<TeamsStore>((set) => ({
  teams: [],
  setTeams: (value: ITeam[]) => {
    set((state) => ({ ...state.teams, teams: value }));
  },
}));

export default useTeamsStore;
export { useTeamsStore };
