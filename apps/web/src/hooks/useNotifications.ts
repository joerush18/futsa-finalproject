import { INotification, db } from "core";
import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import useCurrentUser from "./useCurrentUser";
import useBookings from "./useBookings";

const useNotifications = () => {
  const [notifications, setNotification] = useState<INotification[]>([]);
  const { futsal } = useCurrentUser();
  const { refetch } = useBookings();

  useEffect(() => {
    const notificationRef = db.collection("notifications");
    const query = notificationRef.where("createdFor", "==", futsal.id);
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

  return { notifications };
};

export default useNotifications;
