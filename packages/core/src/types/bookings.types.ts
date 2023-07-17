import { IEntryMeta } from "./meta.types";

enum BOOKING_STATUS {
  "PENDING" = "pending",
  "BOOKED" = "booked",
  "CANCELLED" = "cancelled",
}

export interface IBookings extends IEntryMeta {
  id: string;
  bookedBy: {
    id: string;
    name: string;
  };
  bookedTo: {
    id: string;
    name: string;
  };
  bookedFor: string;
  price: number;
  status: BOOKING_STATUS;
  hasPaid: boolean;
  hasExpired: boolean;
}
