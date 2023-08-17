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
  return useMutation(["create-Member"], (data: IMember) => createMember(data), {
    onSuccess: (data) => {
      console.log("Member Created Successfully.");
    },
    onError: (data) => {
      console.log("Error creating Member.");
    },
  });
};

const useGetMembersByTeam = (teamId: string) => {
  const { setMembers } = useMemberStore();
  return useQuery(["get-Member-by-teamId"], () => getMembersByTeam(teamId), {
    onSuccess: (data) => {
      setMembers(data);
    },
    onError: (data) => {
      console.log({ data });
    },
  });
};
const useUpdateMember = () => {
  return useMutation(
    ["update-booking"],
    async (data: Partial<IMember> & Pick<IMember, "id">) => updateMember(data),
    {
      onSuccess: (data) => {
        console.log("Members updated successfully");
        // Do something with the data if needed
      },
      onError: (error) => {
        console.log("Member update failed");
        // Handle the error if needed
      },
    }
  );
};

const useDeleteMember = () => {
  return useMutation(
    ["update-member"],
    async (memberId: string) => deleteMember(memberId),
    {
      onError: (error) => {
        console.log("Member delete failed");
        // Handle the error if needed
      },
      onSuccess: (data) => console.log("Member deleted successfully"),
    }
  );
};

export {
  useCreateMember,
  useGetMembersByTeam,
  useUpdateMember,
  useDeleteMember,
};
