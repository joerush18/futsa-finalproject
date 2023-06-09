enum ROLES {
  "FUTSAL",
  "PLAYER",
}

interface IUser {
  email: string;
  password: string;
  role: ROLES;
}

export { IUser };
