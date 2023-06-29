enum ROLES {
  "FUTSAL" = "futsal",
  "PLAYER" = "player",
}

interface ISignUpCredentials {
  id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: ROLES;
}
export { ROLES, ISignUpCredentials };
