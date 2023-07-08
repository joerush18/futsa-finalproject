import { doc, getDoc, updateDoc } from "firebase/firestore";
import { IFutsal } from "../../../types/futsals.types";
import { ROLES } from "../../../types/users.types";
import { db } from "../../index";

const createFutsalCollection = async (userUid: string, data: IFutsal) => {
  try {
    const futsalRef = db.collection("futsal").doc(userUid);
    await futsalRef.set({
      ...data,
    });
    return true;
  } catch (error) {
    console.error("Error creating futsal collection:", error);
    throw error;
  }
};

const getCurrentFutsal = async (
  userId: string,
  role: ROLES
): Promise<IFutsal | undefined> => {
  const snapshot = await getDoc(doc(db, role, userId));
  return snapshot.data() as IFutsal;
};

const updateFutsal = async (futsal: Partial<IFutsal> & Pick<IFutsal, "id">) => {
  await updateDoc(doc(db, "futsal", futsal.id as string), futsal);
  return futsal;
};

export { createFutsalCollection, getCurrentFutsal, updateFutsal };
