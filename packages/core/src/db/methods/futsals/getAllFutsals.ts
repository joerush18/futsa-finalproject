import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "core/src/db/index";
import { IFutsal } from "../../../types/futsals.types";

const getAllFutsals = async ({ id, ids }: { id?: string; ids?: string[] }) => {
  if (id) {
    const docSnap = await getDoc(doc(db, "futsal", id));
    return [docSnap.data()] as IFutsal[];
  }
  const queries = [where("status", "==", "ACTIVE")];
  if (ids && ids.length) {
    queries.push(where("id", "in", ids));
  }
  const snapshot = await getDocs(query(collection(db, "futsal"), ...queries));
  return snapshot.docs.map((document) => document.data() as IFutsal);
};

export default getAllFutsals;
