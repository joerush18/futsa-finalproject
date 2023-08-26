import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { Collections, db } from "../..";
import { ITeam } from "../../../types";

const createTeam = async (event: ITeam) => {
  try {
    const ref = db.collection(Collections.Teams).doc(event.id);
    ref.set({
      ...event,
    });
    return true;
  } catch (error) {
    console.error("Error creating Team collection:", error);
    throw error;
  }
};

const updateTeam = async (team: Partial<ITeam> & Pick<ITeam, "id">) => {
  await updateDoc(doc(db, Collections.Teams, team.id as string), team);
  return team;
};

const getTeamsByUser = async (userId: string): Promise<ITeam[]> => {
  const snapshot = await getDocs(
    query(collection(db, Collections.Teams), where("ownerId", "==", userId))
  );
  return snapshot.docs.map((doc) => doc.data() as ITeam);
};

export { createTeam, updateTeam, getTeamsByUser };
