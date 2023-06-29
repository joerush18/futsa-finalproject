import { auth } from "../../index";
import { ISignUpCredentials, ROLES } from "core/src/types/users.types";
import { IFutsal } from "../../../types/futsals.types";
import { IPlayers } from "../../../types/players.types";
import { createFutsalCollection } from "../users/futsal";
import { createPlayerCollection } from "../users/player";

const emailSignUp = async (data: ISignUpCredentials) => {
  const { email, password, phoneNumber, fullName, role } = data;
  try {
    await auth.setPersistence("local");
    const res = await auth.createUserWithEmailAndPassword(email, password);
    if (role === ROLES.PLAYER && res) {
      const _playerData: IPlayers = {
        id: res.user.uid,
        email: res.user.email,
        phonenumber: +phoneNumber,
        address: {
          city: "",
          street: "",
        },
        fullname: fullName,
        avatar: "",
        gender: "",
        geolocation: {
          lat: "",
          lng: "",
        },
      };
      await createPlayerCollection(res.user.uid, _playerData);
      // create Player collection
      return res.user;
    }

    if (role === ROLES.FUTSAL && res) {
      const _futsal: IFutsal = {
        id: res.user.uid,
        email: res.user.email,
        futsalName: fullName,
        address: {
          city: "",
          street: "",
        },
        Amenities: [],
        openTime: 6,
        closeTime: 20,
        phonenumber: +phoneNumber,
        description: "",
        groundSize: 5,
        price: 1200,
        profilePicture: "",
        ratings: 0,
        createdAt: Date.now(),
        geoLocation: {
          lat: "",
          lng: "",
        },
      };
      await createFutsalCollection(res.user.uid, _futsal);
      return res.user;
      // create Futsal collections
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
