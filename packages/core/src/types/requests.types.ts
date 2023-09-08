import { IEntryMeta } from "./meta.types";

export enum REQUEST_STATUS {
  ACTIVE = "ACTIVE",
  ACCEPTED = "ACCEPTED",
}

export interface IRequest extends IEntryMeta {
  id?: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  budget: string;
  deadline: string;
  status: REQUEST_STATUS;
  hasExpired?: boolean;
}
