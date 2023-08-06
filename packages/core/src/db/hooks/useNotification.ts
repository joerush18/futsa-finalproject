import { useMutation } from "@tanstack/react-query";
import { INotification } from "../../types";
import { updateNotification } from "../methods";

const useUpdateNotification = () => {
  return useMutation(
    ["update-notification"],
    async (data: Partial<INotification> & Pick<INotification, "id">) =>
      updateNotification(data),
    {
      onSuccess: (data) => {
        console.log("Notification updated successfully");
        // Do something with the data if needed
      },
      onError: (error) => {
        console.log("Notification update failed");
        // Handle the error if needed
      },
    }
  );
};

export { useUpdateNotification };
