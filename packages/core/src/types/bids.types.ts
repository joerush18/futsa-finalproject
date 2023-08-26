import { IEntryMeta } from "./meta.types";

export interface IBids extends IEntryMeta {
  id: string;
  message: string;
  budget: number;
  requestId: string;
  isSelected: boolean;
  venue?: {
    lat: string;
    lng: string;
    value: string;
  };
  freebies?: string[];
}
