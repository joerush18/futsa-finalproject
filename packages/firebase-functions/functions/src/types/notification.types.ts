import { IEntryMeta } from "./meta.types";

export enum NOTIFICATION_TYPE {
  BOOKING = "made booking",
  BOOKING_CANCELLED = "cancelled booking",
  BOOKING_CONFIRMED = "confirmed booking",
  BOOKING_REJECTED = "rejected booking",
  NEW_TEAM_REGISTERED = "new team registered",
}

interface INotification extends IEntryMeta {
  id: string;
  description: string;
  viewed: boolean;
  type: NOTIFICATION_TYPE;
  createdFor: string;
  bookedForTime?: string;
  bookingId?: string;
}

export { INotification };
