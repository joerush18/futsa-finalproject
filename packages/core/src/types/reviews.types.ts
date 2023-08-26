import { IEntryMeta } from "./meta.types";

interface IReviews extends IEntryMeta {
  id: string;
  userId: string;
  futsalId: string;
  ratings: number;
  review: string;
}

export type { IReviews };
