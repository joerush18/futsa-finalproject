import { useGetMembersByTeam, useMemberStore } from "core";

const useMembers = (id?: string) => {
  const { isLoading } = useGetMembersByTeam(id ?? "");
  const { members } = useMemberStore();
  return {
    isLoading,
    members,
  };
};

export default useMembers;
