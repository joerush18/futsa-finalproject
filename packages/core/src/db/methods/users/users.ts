import { IUser } from "../../../types/users.types";
import { db } from "../../index";
import { getDoc } from "firebase/firestore";

const createUserCollection = async (userUid: string, data: IUser) => {
  try {
    const userRef = db.collection("users").doc(userUid);
    await userRef.set({
      data,
    });
    return true;
  } catch (error) {
    console.error("Error creating user collection:", error);
    throw error;
  }
};

const getCurrentUser = async (userId: string) => {
  try {
    const userRef = db.collection("users").doc(userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData.data;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};
export { createUserCollection, getCurrentUser };
