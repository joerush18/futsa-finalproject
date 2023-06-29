import { IEntryMeta } from "./meta.types";
import { ROLES } from "./users.types";

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
    lat: string;
    lng: string;
  };
  phonenumber: number;
  profilePicture: string;
  price: number;
  openTime: number;
  closeTime: number;
  groundSize: number;
  Amenities: string[];
  ratings: number;
  role: ROLES.FUTSAL;
}
