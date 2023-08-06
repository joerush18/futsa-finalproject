import { INotification, db } from "core";
import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import useCurrentUser from "./useCurrentUser";
import useBookings from "./useBookings";
import { useUpdateNotification } from "core";

const useNotifications = () => {
  const [notifications, setNotification] = useState<INotification[]>([]);
  const { futsal } = useCurrentUser();
  const { refetch } = useBookings();

  useEffect(() => {
    const notificationRef = db.collection("notifications");
    const query = notificationRef
      .where("createdFor", "==", futsal.id)
      .orderBy("createdAt", "desc");
    const unsubscribe = onSnapshot(query, (snapshot) => {
      if (snapshot) {
        const notifications: INotification[] = snapshot.docs.map(
          (doc) => doc.data() as INotification
        );
        setNotification(notifications);
        refetch();
      } else {
        setNotification([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const { mutate: updateNotification, isLoading } = useUpdateNotification();

  const unReadNotificationsCount = notifications.reduce((acc, curr) => {
    if (curr.viewed === false) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return {
    notifications,
    updateNotification,
    isLoading,
    unReadNotificationsCount,
  };
};

export default useNotifications;
