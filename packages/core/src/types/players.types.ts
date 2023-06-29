import { IEntryMeta } from "./meta.types";
import { ROLES } from "./users.types";

interface IPlayers extends IEntryMeta {
  id: string;
  email: string;
  fullname: string;
  address: {
    city: string;
    street: string;
  };
  avatar?: string;
  gender?: string;
  geolocation?: {
    lat: string;
    lng: string;
  };
  phonenumber: number;
  role: ROLES.PLAYER;
}

export { IPlayers };
