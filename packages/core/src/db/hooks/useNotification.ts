import { useMutation } from "@tanstack/react-query";
import { INotification } from "../../types";
import { updateNotification } from "../methods";

const useUpdateNotification = () => {
  return useMutation(
    ["update-notification"],
    async (data: Partial<INotification> & Pick<INotification, "id">) =>
      updateNotification(data)
  );
};

export { useUpdateNotification };
