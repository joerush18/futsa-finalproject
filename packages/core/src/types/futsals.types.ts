import { IEntryMeta } from "./meta.types";

export interface IFutsal extends IEntryMeta {
  id: string;
  userId: string;
  name: string;
  description: string;
  ratings: number;
  address: {
    city: string;
    street: string;
  };
  geoLocation?: {
    lat: number;
    lng: number;
  };
  contactNumber: number;
  profilePicture: string;
  price: number;
  openTime: number;
  closeTime: number;
  groundSize: number;
  Amenities: string[];
}
