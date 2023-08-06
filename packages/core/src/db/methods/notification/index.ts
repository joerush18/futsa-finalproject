import { doc, updateDoc } from "firebase/firestore";
import { db } from "../..";
import { INotification } from "../../../types";

const updateNotification = async (
  notification: Partial<INotification> & Pick<INotification, "id">
) => {
  await updateDoc(
    doc(db, "notifications", notification.id as string),
    notification
  );
  return notification;
};

export { updateNotification };
