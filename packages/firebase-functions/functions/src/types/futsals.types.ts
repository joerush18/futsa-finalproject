import { IEntryMeta } from "./meta.types";
import { ROLES } from "./users.types";

export enum STATUS {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  PENDING = "PENDING",
  SUSPENDED = "SUSPENDED",
}

export interface IFutsal extends IEntryMeta {
  id: string;
  email: string;
  futsalName: string;
  description: string;
  address: {
    city: string;
    street: string;
  };
  geoLocation?: {
    value?: any;
    lat?: string;
    lng?: string;
  };
  phonenumber: number;
  profilePicture?: string;
  coverPicture?: string;
  verificationPicture?: string;
  price: number;
  openTime: string;
  closeTime: string;
  groundSize: number;
  Amenities: string[];
  ratings: number;
  role: ROLES.FUTSAL;
  status: STATUS;

  // local
  isLoved?: boolean;
}
