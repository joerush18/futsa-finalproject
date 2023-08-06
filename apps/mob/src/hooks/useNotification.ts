import { INotification, db } from "core";
import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import useCurrentUser from "./useCurrentUser";
import useYourBookings from "./useYourBookings";

const useNotifications = () => {
  const [notifications, setNotification] = useState<INotification[]>([]);
  const { user } = useCurrentUser();
  const { onRefresh } = useYourBookings();

  useEffect(() => {
    const notificationRef = db.collection("notifications");
    const query = notificationRef
      .where("createdFor", "==", user.id)
      .orderBy("createdAt", "desc");
    const unsubscribe = onSnapshot(query, (snapshot) => {
      if (snapshot) {
        const notifications: INotification[] = snapshot.docs.map(
          (doc) => doc.data() as INotification
        );
        setNotification(notifications);
        onRefresh();
      } else {
        setNotification([]);
      }
    });
    return () => unsubscribe();
  }, []);

  return { notifications };
};

export default useNotifications;
