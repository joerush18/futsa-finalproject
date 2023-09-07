import { useGetMembersByTeam } from "core";

const useMembers = (teamId: string) => {
  const { data, isLoading } = useGetMembersByTeam(teamId);

  return {
    members: data,
    isLoading,
  };
};

export default useMembers;
