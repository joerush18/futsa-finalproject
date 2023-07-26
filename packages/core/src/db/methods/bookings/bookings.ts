import { IBookings } from "../../../types";
import { db } from "../..";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { createUniqueId } from "../../../utils";

const createBooking = async (data: IBookings) => {
  const id = createUniqueId();
  try {
    const bookingRef = db.collection("bookings").doc(id);
    await bookingRef.set({
      ...data,
      id,
    });
    return true;
  } catch (error) {
    console.error("Error creating futsal collection:", error);
    throw error;
  }
};
const getBookingByFutsalId = async (futsalId: string): Promise<IBookings[]> => {
  const snapshot = await getDocs(
    query(
      collection(db, "bookings"),
      where("bookedToFutsal.id", "==", futsalId),
      where("hasExpired", "==", false),
      orderBy("createdAt", "asc")
    )
  );
  return snapshot.docs.map((doc) => doc.data() as IBookings);
};

const updateBooking = async (
  booking: Partial<IBookings> & Pick<IBookings, "id">
) => {
  await updateDoc(doc(db, "bookings", booking.id as string), booking);
  return booking;
};

export { createBooking, getBookingByFutsalId, updateBooking };
