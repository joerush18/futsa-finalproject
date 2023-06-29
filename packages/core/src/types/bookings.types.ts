import { IEntryMeta } from "./meta.types";

enum BOOKING_STATUS {
  "PENDING" = "pending",
  "BOOKED" = "booked",
  "CANCELLED" = "cancelled",
}

export interface IBookings extends IEntryMeta {
  id: string;
  bookedBy: string;
  bookedTo: string;
  bookedTime: string;
  bookedDate: string;
  price: string;
  status: BOOKING_STATUS;
  hasPaid: boolean;
  hasExpired: boolean;
}
