enum ROLES {
  "FUTSAL" = "futsal",
  "PLAYER" = "player",
}

interface IUser {
  id: string;
  email: string;
  phonenumber: string;
  role: ROLES;
  isa?: boolean;
  fullName: string;
  avatar?: string;
  gender?: string;
  location?: {
    lat: string;
    lng: string;
  };
}

interface ISignUpCredentials {
  id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export { IUser, ROLES, ISignUpCredentials };
