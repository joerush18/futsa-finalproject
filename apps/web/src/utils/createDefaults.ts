import { IBids, IEntryMeta, IEvents, IFutsal, TOURNAMENT_TYPE } from "core";

export const createEventDefaultValue = (event?: IEvents) => {
  const defaultEvent: IEvents = {
    id: event?.id ?? "",
    name: event?.name ?? "",
    description: event?.description ?? "",
    eventDate: event?.eventDate ?? new Date().toISOString().slice(0, 10),
    endDate: event?.endDate ?? new Date().toISOString().slice(0, 10),
    eventImage: event?.eventImage ?? "",
    teams: event?.teams ?? [],
    hasExpired: event?.hasExpired ?? false,
    entryFee: event?.entryFee ?? "",
    tournamentType: event?.tournamentType ?? TOURNAMENT_TYPE.Knockout,
    gameTime: event?.gameTime ?? "",
    numberOfPlayers: event?.numberOfPlayers ?? "",
    prizes: event?.prizes ?? [],
  };
  return defaultEvent;
};

export const createIMetaDefaultValue = (futsal: IFutsal) => {
  const defaultMeta: IEntryMeta = {
    createdAt: +new Date(),
    createdBy: {
      id: futsal.id,
      name: futsal.futsalName,
      email: futsal.email,
    },
  };
  return defaultMeta;
};

export const createBidDefaultValue = (bid?: IBids) => {
  const defaultBid: IBids = {
    id: bid?.id ?? "",
    budget: bid?.budget ?? 0,
    message: bid?.message ?? "",
    isSelected: bid?.isSelected ?? false,
    freebies: bid?.freebies ?? [],
    requestId: bid?.requestId ?? "",
    venue: bid?.venue ?? {
      lat: "",
      lng: "",
      value: "",
    },
  };
  return defaultBid;
};
