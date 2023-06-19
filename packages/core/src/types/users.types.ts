enum ROLES {
  "FUTSAL",
  "PLAYER",
}

interface IUser {
  id: string;
  email: string;
  password: string;
  phonenumber: string;
  role: ROLES;
  isa?: boolean;
}

export { IUser, ROLES };
