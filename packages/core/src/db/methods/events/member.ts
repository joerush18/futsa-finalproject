import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { Collections, db } from "../..";
import { IMember } from "../../../types";

const createMember = async (event: IMember) => {
  try {
    const ref = db.collection(Collections.Members).doc(event.id);
    ref.set({
      ...event,
    });
    return true;
  } catch (error) {
    console.error("Error creating Member collection:", error);
    throw error;
  }
};

const updateMember = async (member: Partial<IMember> & Pick<IMember, "id">) => {
  await updateDoc(doc(db, Collections.Members, member.id as string), member);
  return member;
};

const getMembersByTeam = async (teamId: string): Promise<IMember[]> => {
  const snapshot = await getDocs(
    query(collection(db, Collections.Members), where("teamId", "==", teamId))
  );
  return snapshot.docs.map((doc) => doc.data() as IMember);
};

const deleteMember = async (memberId: string) => {
  const ref = db.collection(Collections.Members).doc(memberId);
  await ref.delete();
};

export { createMember, updateMember, getMembersByTeam, deleteMember };
