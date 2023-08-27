import {} from "firebase-admin/firestore";
import { Collection, Database, functions } from "../config/admin";
import { IBookings, IEvents, IRequest } from "../types";

const cleanUpCronjob = functions.pubsub
  .schedule("0 * * * *")
  .timeZone("Etc/UTC")
  .onRun(async () => {
    // Expire all bookings that are pending and has crossed the booking time
    const bookingRef = await Database.collection(Collection.Bookings)
      .where("status", "==", "pending")
      .where("hasPaid", "==", false)
      .where("bookedFor", "<", new Date())
      .get();

    const bookings = bookingRef.docs.map((doc) => doc.data() as IBookings);

    if (bookings.length) {
      bookings.forEach(async (booking) => {
        await Database.collection(Collection.Bookings)
          .doc(booking?.id ?? "")
          .update({
            hasExpired: true,
          });
      });
    }

    // Expire all requests on completion of deadline.
    const requestRef = await Database.collection(Collection.Requests)
      .where("deadline", "<", new Date())
      .get();

    const requests = requestRef.docs.map((doc) => doc.data() as IRequest);
    if (requests.length) {
      requests.forEach(async (request) => {
        await Database.collection(Collection.Requests)
          .doc(request?.id ?? "")
          .update({
            hasExpired: true,
          });
      });
    }

    // Expire all events on completion of deadline.
    const eventRef = await Database.collection(Collection.Requests)
      .where("deadline", "<", new Date())
      .get();

    const events = eventRef.docs.map((doc) => doc.data() as IEvents);
    if (events.length) {
      events.forEach(async (event) => {
        await Database.collection(Collection.Events)
          .doc(event?.id ?? "")
          .update({
            hasExpired: true,
          });
      });
    }
  });

export default cleanUpCronjob;
