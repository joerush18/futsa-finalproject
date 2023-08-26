import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createMember,
  deleteMember,
  getMembersByTeam,
  updateMember,
} from "../methods";
import { IMember } from "../../types";
import useMemberStore from "../../store/useMemberStore";

const useCreateMember = () => {
  return useMutation(["create-Member"], (data: IMember) => createMember(data));
};

const useGetMembersByTeam = (teamId: string) => {
  const { setMembers } = useMemberStore();
  return useQuery(["get-Member-by-teamId"], () => getMembersByTeam(teamId), {
    onSuccess: (data) => {
      setMembers(data);
    },
  });
};
const useUpdateMember = () => {
  return useMutation(
    ["update-booking"],
    async (data: Partial<IMember> & Pick<IMember, "id">) => updateMember(data)
  );
};

const useDeleteMember = () => {
  return useMutation(["update-member"], async (memberId: string) =>
    deleteMember(memberId)
  );
};

export {
  useCreateMember,
  useGetMembersByTeam,
  useUpdateMember,
  useDeleteMember,
};
