import { useMutation, useQuery } from "@tanstack/react-query";
import { createTeam, getTeamsByUser, updateTeam } from "../methods";
import { ITeam } from "../../types";
import useTeamsStore from "../../store/useTeamStore";

const useCreateTeam = () => {
  return useMutation(["create-Team"], (data: ITeam) => createTeam(data));
};

const useGetTeamsByUser = (userId: string) => {
  const { setTeams } = useTeamsStore();
  return useQuery(["get-Team-by-userId"], () => getTeamsByUser(userId), {
    onSuccess: (data) => {
      setTeams(data);
    },
  });
};

const useUpdateTeam = () => {
  return useMutation(
    ["update-booking"],
    async (data: Partial<ITeam> & Pick<ITeam, "id">) => updateTeam(data)
  );
};

export { useCreateTeam, useGetTeamsByUser, useUpdateTeam };
