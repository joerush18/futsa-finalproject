import { INotification, db } from "core";
import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import useCurrentUser from "./useCurrentUser";
import useYourBookings from "./useYourBookings";
import usePushNotification from "./usePushNotification";
import { set } from "date-fns";

const useNotifications = () => {
  const [notifications, setNotification] = useState<INotification[]>([]);
  const [unReadNotification, setUnReadNotification] = useState<number>(0);
  const { user } = useCurrentUser();
  const { onRefresh } = useYourBookings();
  // const { schedulePushNotification } = usePushNotification();

  useEffect(() => {
    if (!user) return;
    const notificationRef = db.collection("notifications");
    const query = notificationRef
      .where("createdFor", "==", user?.id ?? "")
      .orderBy("createdAt", "desc");
    const unsubscribe = onSnapshot(query, (snapshot) => {
      if (snapshot) {
        const notifications: INotification[] = snapshot.docs.map(
          (doc) => doc.data() as INotification
        );
        setNotification(notifications);
        onRefresh();
        // schedulePushNotification({
        //   title: "New Notification",
        //   body: `You have new notification from ${notifications[0].createdBy?.name}`,
        //   imageUrl:
        //     "https://banner2.cleanpng.com/20180519/xfp/kisspng-futsal-football-pitch-antequera-clip-art-5affdc64131bb1.7245461315267175400783.jpg",
        //   data: {
        //     value: "Futsa",
        //   },
        // });
        const unReadNotification = notifications.reduce((acc, curr) => {
          if (!curr.viewed) {
            acc++;
          }
          return acc;
        }, 0);
        setUnReadNotification(unReadNotification);
      } else {
        setNotification([]);
      }
    });
    return () => unsubscribe();
  }, []);

  return { notifications, unReadNotification };
};

export default useNotifications;
