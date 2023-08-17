import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { Collections, db } from "../..";
import { IEvents } from "../../../types";
import { createUniqueId } from "../../../utils";

const createEvent = async (event: IEvents) => {
  const id = createUniqueId();
  try {
    const ref = db.collection(Collections.Events).doc(id);
    ref.set({
      ...event,
      id,
    });
    return true;
  } catch (error) {
    console.error("Error creating event collection:", error);
    throw error;
  }
};

const updateEvent = async (event: Partial<IEvents> & Pick<IEvents, "id">) => {
  await updateDoc(doc(db, Collections.Events, event.id as string), event);
  return event;
};

const getEventsByFutsal = async (futsalId: string): Promise<IEvents[]> => {
  const snapshot = await getDocs(
    query(
      collection(db, Collections.Events),
      where("createdBy.id", "==", futsalId),
      orderBy("createdAt", "desc")
    )
  );
  return snapshot.docs.map((doc) => doc.data() as IEvents);
};

const getAllEvents = async (): Promise<IEvents[]> => {
  const snapshot = await getDocs(
    query(collection(db, Collections.Events), orderBy("createdAt", "desc"))
  );
  return snapshot.docs.map((doc) => doc.data() as IEvents);
};

export { createEvent, updateEvent, getEventsByFutsal, getAllEvents };
export * from "./team";
export * from "./member";
