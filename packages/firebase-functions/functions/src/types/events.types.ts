import { IEntryMeta } from "./meta.types";

export enum TOURNAMENT_TYPE {
  Knockout = "Knockout",
  League = "League",
  KnockoutAndLeague = "Knockout & League",
}

export interface IEvents extends IEntryMeta {
  id: string;
  name: string;
  description: string;
  eventDate: string;
  endDate: string;
  eventImage: string;
  teams: ITeam[];
  hasExpired: boolean;
  entryFee: string;
  tournamentType: TOURNAMENT_TYPE;
  gameTime: string;
  numberOfPlayers: string;
  geoLocation?: {
    lat: string;
    lng: string;
    value: string;
  };

  registrationEndDate?: string;

  prizes?: string[];
}

export interface ITeam extends IEntryMeta {
  id: string;
  name: string;
  ownerId: string;
  verified: boolean;
}

export interface IMember {
  id: string;
  memberName: string;
  gender: string;
  age: number;
  position: string;
  jerseyNumber: number;
  phoneNumber: string;
  email: string;
  isCaptain: boolean;
  teamId: string;
}
