import { IEntryMeta } from "./meta.types";

export interface IEvents extends IEntryMeta {
  id: string;
  name: string;
  description: string;
  eventDate: string;
  teams: ITeam[];
  hasExpired: boolean;
  eventImage: string;
  entryFee: number;
}

export interface ITeam {
  id: string;
  name: string;
  members: IMember[];
}

export interface IMember {
  id: string;
  name: string;
  gender: string;
  age: number;
  position: string;
  jerseyNumber: number;
}
