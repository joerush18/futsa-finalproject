import { Collections, IBookings, IInitiatiatePayment } from "core";

export const paymentData = (booking: IBookings): IInitiatiatePayment => {
  if (!booking) {
    return {} as IInitiatiatePayment;
  }
  const data: IInitiatiatePayment = {
    amount: booking.price.toString(),
    customerEmail: booking?.createdBy?.email ?? "",
    customerPhone: "9846168323",
    customerName: booking?.createdBy?.name ?? "",
    orderId: `${Collections.Bookings}_${booking.id}`,
    futsalId: booking.bookedToFutsal.id,
    futsalName: booking.bookedToFutsal.name,
    bookedFor: `${booking.bookedToFutsal.name}_${booking.bookedToFutsal.id}_${
      booking?.createdBy?.name ?? ""
    }_${booking?.createdBy?.id ?? ""}`,
  };

  return { ...data };
};
