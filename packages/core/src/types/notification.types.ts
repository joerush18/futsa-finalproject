import { IEntryMeta } from "./meta.types";

export enum NOTIFICATION_TYPE {
  BOOKING = "bookings",
  PAYMENT = "transactions",
  EVENT = "events",
  REQUESTS = "requests",
}

interface INotification extends IEntryMeta {
  id: string;
  description: string;
  viewed: boolean;
  type: NOTIFICATION_TYPE;
  createdFor: string;
  collectionId: string;
}

export type { INotification };
