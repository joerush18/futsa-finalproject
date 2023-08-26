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
import { IRequest } from "../../../types";
import { createUniqueId } from "../../../utils";

const createRequest = async (request: IRequest) => {
  const id = createUniqueId();
  try {
    const ref = db.collection(Collections.Requests).doc(id);
    ref.set({
      ...request,
      id,
    });
    return true;
  } catch (error) {
    console.error("Error creating request collection:", error);
    throw error;
  }
};

const updateRequest = async (
  request: Partial<IRequest> & Pick<IRequest, "id">
) => {
  try {
    await updateDoc(
      doc(db, Collections.Requests, request.id as string),
      request
    );
    return true;
  } catch (error) {
    console.error("Error updating request collection:", error);
    throw error;
  }
};

const getAllRequests = async (): Promise<IRequest[]> => {
  try {
    const snapshot = await getDocs(
      query(collection(db, Collections.Requests), orderBy("createdAt", "desc"))
    );
    return snapshot.docs.map((doc) => doc.data() as IRequest);
  } catch (error) {
    console.error("Error getting all requests:", error);
    throw error;
  }
};

const getRequestsByUserId = async (userId: string): Promise<IRequest[]> => {
  try {
    const snapshot = await getDocs(
      query(
        collection(db, Collections.Requests),
        where("createdBy.id", "==", userId),
        orderBy("createdAt", "desc")
      )
    );
    return snapshot.docs.map((doc) => doc.data() as IRequest);
  } catch (error) {
    console.error("Error getting all requests:", error);
    throw error;
  }
};

export { createRequest, updateRequest, getAllRequests, getRequestsByUserId };
