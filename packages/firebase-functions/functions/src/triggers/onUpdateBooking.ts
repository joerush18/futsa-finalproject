import { Collection, Database, functions } from "../config/admin";
import { QueryDocumentSnapshot } from "firebase-functions/v1/firestore";
import { INotification, NOTIFICATION_TYPE } from "../types/notification.types";
import { BOOKING_STATUS, IBookings } from "../types/bookings.types";
import { createUniqueId } from "../utils/createUniqueId";
import { Change } from "firebase-functions/v1";

const listener = async (snapshot: Change<QueryDocumentSnapshot>) => {
  const before = snapshot.before.data() as IBookings;
  const booking = snapshot.after.data() as IBookings;
  if (!booking) {
    return;
  }
  const id = createUniqueId();
  const notificationRef = Database.collection(Collection.Notification).doc(id);

  if (
    before.status === BOOKING_STATUS.PENDING &&
    (booking.status === BOOKING_STATUS.BOOKED ||
      booking.status === BOOKING_STATUS.REJECTED)
  ) {
    const _notification: INotification = {
      id,
      description: `Your booking #${booking.id} has been finalized.`,
      viewed: false,
      type: NOTIFICATION_TYPE.BOOKING,
      createdAt: +new Date(),
      createdBy: {
        name: booking.bookedToFutsal.name,
        id: booking.bookedToFutsal.id,
      },
      createdFor: booking.bookedByUser?.id ?? "",
      collectionId: booking.id ?? "",
    };
    try {
      await notificationRef.set(_notification);
    } catch (e) {
      throw new Error("Error while creating notification");
    }
  }
  if (
    before.status === BOOKING_STATUS.BOOKED &&
    booking.status === BOOKING_STATUS.CANCELLED
  ) {
    const _notification: INotification = {
      id,
      description: `The booking has been finalized.`,
      viewed: false,
      type: NOTIFICATION_TYPE.BOOKING,
      createdAt: +new Date(),
      createdBy: booking.createdBy,
      createdFor: booking.bookedToFutsal.id,
      collectionId: booking.id ?? "",
    };
    try {
      await notificationRef.set(_notification);
      await Database.collection(Collection.Bookings)
        .doc(booking?.id ?? "")
        .delete();
    } catch (e) {
      throw new Error("Error while creating notification");
    }
  }

  if (before.hasPaid === false && booking.hasPaid === true) {
    const _notification: INotification = {
      id,
      description: `You received a payment from ${booking.createdBy?.name}`,
      viewed: false,
      type: NOTIFICATION_TYPE.PAYMENT,
      createdAt: +new Date(),
      createdBy: booking.createdBy,
      createdFor: booking.bookedToFutsal.id,
      collectionId: booking.id ?? "",
    };
    try {
      await notificationRef.set(_notification);
    } catch (e) {
      throw new Error("Error while creating notification");
    }
  }
  return Promise.resolve();
};

const onUpdateBooking = functions.firestore
  .document(`${Collection.Bookings}/{id}`)
  .onUpdate((snap) => listener(snap));

export default onUpdateBooking;
