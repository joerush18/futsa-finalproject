import { useCreateTeam, useGetTeamsByUser, useTeamsStore } from "core";
import useCurrentUser from "./useCurrentUser";

const useTeam = () => {
  const { user } = useCurrentUser();
  const { isLoading: isFetchingTeams, refetch } = useGetTeamsByUser(user?.id);

  const { mutate: createTeam, isLoading: isCreatingTeam } = useCreateTeam();

  const { teams, setTeams } = useTeamsStore();

  return {
    teams,
    setTeams,
    isFetchingTeams,
    createTeam,
    isCreatingTeam,
    refetch,
    userId: user?.id,
  };
};

export default useTeam;
