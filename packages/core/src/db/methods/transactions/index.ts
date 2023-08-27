import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { Collections, db } from "../..";
import { ITransaction } from "../../../types/transactions.types";

const getTrasactionsByFutsal = async (
  futsalId: string
): Promise<ITransaction[]> => {
  try {
    const snapshot = await getDocs(
      query(
        collection(db, Collections.Transactions),
        where("payedTo.id", "==", futsalId),
        orderBy("payedAt", "desc")
      )
    );
    return snapshot.docs.map((doc) => doc.data() as ITransaction);
  } catch (error) {
    console.error("Error getting all trasactions", error);
    throw error;
  }
};

const getTrasactionsByUser = async (
  userId: string
): Promise<ITransaction[]> => {
  try {
    const snapshot = await getDocs(
      query(
        collection(db, Collections.Transactions),
        where("payedBy.id", "==", userId),
        orderBy("payedAt", "desc")
      )
    );
    return snapshot.docs.map((doc) => doc.data() as ITransaction);
  } catch (error) {
    console.error("Error getting all trasactions", error);
    throw error;
  }
};

export { getTrasactionsByFutsal, getTrasactionsByUser };
