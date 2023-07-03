import { IFutsal, STATUS } from "core/src/types/futsals.types";
import { ROLES } from "core/src/types/users.types";

export interface IOnboardingState extends IFutsal {}

export const createDefaultValues = (futsal: IFutsal): IOnboardingState => {
  return {
    id: futsal.id ?? "",
    email: futsal.email ?? "",
    futsalName: futsal.futsalName ?? "",
    description: futsal.description ?? "",
    address: {
      city: futsal.address?.city ?? "",
      street: futsal.address?.street ?? "",
    },
    geoLocation: {
      lat: futsal.geoLocation?.lat ?? "",
      lng: futsal.geoLocation?.lng ?? "",
    },
    phonenumber: futsal.phonenumber ?? 0,
    profilePicture: futsal.profilePicture ?? "",
    price: futsal.price ?? "",
    openTime: futsal.openTime ?? 8,
    closeTime: futsal.closeTime ?? 22,
    groundSize: futsal.groundSize ?? "",
    Amenities: futsal.Amenities ?? [],
    ratings: futsal.ratings ?? 0,
    role: ROLES.FUTSAL,
    status: futsal.status ?? STATUS.PENDING,
  };
};
