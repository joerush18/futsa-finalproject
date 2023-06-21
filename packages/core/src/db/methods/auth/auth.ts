import { auth } from "../../index";
import { ISignUpCredentials, IUser, ROLES } from "core/src/types/users.types";
import { createUserCollection } from "../users/users";

const emailSignUp = async (data: ISignUpCredentials) => {
  const { email, password, phoneNumber, fullName } = data;
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    if (res) {
      const _playerData: IUser = {
        id: res.user.uid,
        email: res.user.email,
        phonenumber: phoneNumber,
        role: ROLES.PLAYER,
        fullName,
        avatar: "",
        gender: "",
        location: {
          lat: "",
          lng: "",
        },
      };
      await createUserCollection(res.user.uid, _playerData);
      return res.user;
    }
  } catch (error) {
    throw error;
  }
};

const emailLogin = async (
  data: Pick<ISignUpCredentials, "email" | "password">
) => {
  const { email, password } = data;
  try {
    const res = await auth.signInWithEmailAndPassword(email, password);
    return res.user;
  } catch (error) {
    throw error;
  }
};

const logout = async () => {
  try {
    const res = await auth.signOut();
    return res;
  } catch (error) {
    throw error;
  }
};

export { emailSignUp, emailLogin, logout };
