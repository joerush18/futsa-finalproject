import { IFutsal } from "../../../types/futsals.types";
import { db } from "../../index";

const createFutsalCollection = async (userUid: string, data: IFutsal) => {
  try {
    const futsalRef = db.collection("futsal").doc(userUid);
    await futsalRef.set({
      data,
    });
    return true;
  } catch (error) {
    console.error("Error creating futsal collection:", error);
    throw error;
  }
};

export { createFutsalCollection };
