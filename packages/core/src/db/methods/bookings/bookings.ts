import { IBookings } from "../../../types";
import { db } from "../..";
import { collection, getDocs, query, where } from "firebase/firestore";

const createBooking = async (data: IBookings) => {
  try {
    const bookingRef = db.collection("bookings").doc();
    await bookingRef.set({
      ...data,
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
      where("bookedToFutsal.id", "==", futsalId)
    )
  );
  return snapshot.docs.map((doc) => doc.data() as IBookings);
};
export { createBooking, getBookingByFutsalId };
