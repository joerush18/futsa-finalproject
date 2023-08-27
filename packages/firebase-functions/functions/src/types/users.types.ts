export enum ROLES {
  FUTSAL = "futsal",
  PLAYER = "player",
}

interface ISignUpCredentials {
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: ROLES;
}
export type { ISignUpCredentials };
