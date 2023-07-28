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
      value: futsal.geoLocation?.value ?? "",
      lat: futsal.geoLocation?.lat ?? "",
      lng: futsal.geoLocation?.lng ?? "",
    },
    phonenumber: futsal.phonenumber ?? "",
    profilePicture: futsal.profilePicture ?? "",
    coverPicture: futsal.coverPicture ?? "",
    verificationPicture: futsal.verificationPicture ?? "",
    price: futsal.price ?? "",
    openTime: futsal.openTime ?? "08:00",
    closeTime: futsal.closeTime ?? "22:00",
    groundSize: futsal.groundSize ?? "",
    Amenities: futsal.Amenities ?? [],
    ratings: futsal.ratings ?? 0,
    role: ROLES.FUTSAL,
    status: futsal.status ?? STATUS.PENDING,
  };
};
