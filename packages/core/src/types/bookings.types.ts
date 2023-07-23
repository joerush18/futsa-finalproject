import { IEntryMeta } from "./meta.types";

export enum BOOKING_STATUS {
  "PENDING" = "pending",
  "BOOKED" = "booked",
  "CANCELLED" = "cancelled",
}
export enum PAYMENT_METHOD {
  "KHALTI" = "khalti",
  "ESEWA" = "esewa",
  "STRIPE" = "stripe",
}

export interface IBookings extends IEntryMeta {
  id?: string;
  bookedByUser: {
    id: string;
    name: string;
    email: string;
  };
  bookedToFutsal: {
    id: string;
    name: string;
  };
  bookedFor: string;
  price: number;
  status: BOOKING_STATUS;
  hasPaid: boolean;
  hasExpired: boolean;
  paymentMethod: PAYMENT_METHOD;
}
