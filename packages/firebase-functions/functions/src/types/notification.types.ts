import { IEntryMeta } from "./meta.types";

export enum NOTIFICATION_TYPE {
  BOOKING = "made booking",
  BOOKING_CANCELLED = "cancelled booking",
  BOOKING_CONFIRMED = "confirmed booking",
  BOOKING_REJECTED = "rejected booking",
}

interface INotification extends IEntryMeta {
  id: string;
  description: string;
  viewed: boolean;
  type: NOTIFICATION_TYPE;
  createdFor: string;
  bookedForTime?: string;
}

export { INotification };
