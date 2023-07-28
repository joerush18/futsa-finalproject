import { Collection, Database, functions } from "../config/admin";
import { QueryDocumentSnapshot } from "firebase-functions/v1/firestore";
import { INotification, NOTIFICATION_TYPE } from "../types/notification.types";
import { BOOKING_STATUS, IBookings } from "../types/bookings.types";
import { createUniqueId } from "../utils/createUniqueId";
import { Change } from "firebase-functions/v1";

const listener = async (snapshot: Change<QueryDocumentSnapshot>) => {
  const booking = snapshot.after.data() as IBookings;
  if (!booking) {
    return;
  }
  const id = createUniqueId();
  const notificationRef = Database.collection(Collection.Notification).doc(id);

  if (
    booking.status === BOOKING_STATUS.BOOKED ||
    booking.status === BOOKING_STATUS.REJECTED
  ) {
    const _notification: INotification = {
      id,
      description: `You booking for ${booking.bookedFor} has been ${booking.status} by ${booking.createdBy?.name}`,
      viewed: false,
      type:
        booking.status === BOOKING_STATUS.BOOKED
          ? NOTIFICATION_TYPE.BOOKING_CONFIRMED
          : NOTIFICATION_TYPE.BOOKING_REJECTED,
      createdAt: +new Date(),
      createdBy: {
        name: booking.bookedToFutsal.name,
        id: booking.bookedToFutsal.id,
      },
      createdFor: booking.bookedByUser.id,
      bookedForTime: booking.bookedFor,
      bookingId: booking.id,
    };
    try {
      await notificationRef.set(_notification);
    } catch (e) {
      throw new Error("Error while creating notification");
    }
  }
  if (booking.status === BOOKING_STATUS.CANCELLED) {
    const _notification: INotification = {
      id,
      description: `The booking for ${booking.bookedFor} has been ${booking.status} by ${booking.createdBy?.name}.`,
      viewed: false,
      type: NOTIFICATION_TYPE.BOOKING_CANCELLED,
      createdAt: +new Date(),
      createdBy: booking.createdBy,
      createdFor: booking.bookedToFutsal.id,
      bookedForTime: booking.bookedFor,
      bookingId: booking.id,
      updatedAt: +new Date(),
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
  return Promise.resolve();
};

const onUpdateBooking = functions.firestore
  .document(`${Collection.Bookings}/{id}`)
  .onUpdate((snap) => listener(snap));

export default onUpdateBooking;
