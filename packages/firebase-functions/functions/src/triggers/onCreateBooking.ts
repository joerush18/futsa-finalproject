import { Collection, Database, functions } from "../config/admin";
import { QueryDocumentSnapshot } from "firebase-functions/v1/firestore";
import { INotification, NOTIFICATION_TYPE } from "../types/notification.types";
import { IBookings } from "../types/bookings.types";
import { createUniqueId } from "../utils/createUniqueId";

const listener = async (snapshot: QueryDocumentSnapshot) => {
  const booking = snapshot.data() as IBookings;
  const id = createUniqueId();
  const notificationRef = Database.collection(Collection.Notification).doc(id);
  const _notification: INotification = {
    id,
    description: `You have a new booking from ${booking.createdBy?.name}`,
    viewed: false,
    type: NOTIFICATION_TYPE.BOOKING,
    createdAt: +new Date(),
    createdBy: booking.createdBy,
    createdFor: booking.bookedToFutsal.id,
    bookedForTime: booking.bookedFor,
  };
  try {
    await notificationRef.set(_notification);
  } catch (e) {
    throw new Error("Error while creating notification");
  }
  return Promise.resolve();
};

const onCreateBooking = functions.firestore
  .document(`${Collection.Bookings}/{id}`)
  .onCreate((snap) => listener(snap));

export default onCreateBooking;
