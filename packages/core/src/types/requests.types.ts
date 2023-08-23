import { IEntryMeta } from "./meta.types";

export enum REQUEST_STATUS {
  ACTIVE = "ACTIVE",
  ACCEPTED = "ACCEPTED",
}

export interface IRequest extends IEntryMeta {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  budget: number;
  deadline: Date;
  status: REQUEST_STATUS;
}
