import { useMutation, useQuery } from "@tanstack/react-query";
import { createTeam, getTeamsByUser, updateTeam } from "../methods";
import { ITeam } from "../../types";
import useTeamsStore from "../../store/useTeamStore";

const useCreateTeam = () => {
  return useMutation(["create-Team"], (data: ITeam) => createTeam(data), {
    onSuccess: (data) => {},
    onError: (data) => {
      console.log("Error creating Team.");
    },
  });
};

const useGetTeamsByUser = (userId: string) => {
  const { setTeams } = useTeamsStore();
  return useQuery(["get-Team-by-userId"], () => getTeamsByUser(userId), {
    onSuccess: (data) => {
      setTeams(data);
    },
    onError: (data) => {
      console.log({ data });
    },
  });
};

const useUpdateTeam = () => {
  return useMutation(
    ["update-booking"],
    async (data: Partial<ITeam> & Pick<ITeam, "id">) => updateTeam(data),
    {
      onSuccess: (data) => {
        console.log("Teams updated successfully");
        // Do something with the data if needed
      },
      onError: (error) => {
        console.log("Team update failed");
        // Handle the error if needed
      },
    }
  );
};

export { useCreateTeam, useGetTeamsByUser, useUpdateTeam };
