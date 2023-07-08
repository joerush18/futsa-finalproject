import { IPlayers } from "../../../types/players.types";
import { ROLES } from "../../../types/users.types";
import { db } from "../../index";
import { getDoc, doc } from "firebase/firestore";

const createPlayerCollection = async (userUid: string, data: IPlayers) => {
  try {
    const playerRef = db.collection("player").doc(userUid);
    await playerRef.set({
      ...data,
    });
    return true;
  } catch (error) {
    console.error("Error creating player collection:", error);
    throw error;
  }
};

const getCurrentPlayer = async (
  userId: string,
  role: ROLES
): Promise<IPlayers | undefined> => {
  const snapshot = await getDoc(doc(db, role, userId));
  return snapshot.data() as IPlayers;
};
export { createPlayerCollection, getCurrentPlayer };
