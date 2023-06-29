import { IPlayers } from "../../../types/players.types";
import { db } from "../../index";
import { getDoc } from "firebase/firestore";

const createPlayerCollection = async (userUid: string, data: IPlayers) => {
  try {
    const playerRef = db.collection("player").doc(userUid);
    await playerRef.set({
      data,
    });
    return true;
  } catch (error) {
    console.error("Error creating player collection:", error);
    throw error;
  }
};



const getCurrentUser = async (userId: string) => {
  try {
    const userRef = db.collection("player").doc(userId);
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
export { createPlayerCollection, getCurrentUser };
