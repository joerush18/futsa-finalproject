import { Collection, Database, functions } from "../config/admin";
import { QueryDocumentSnapshot } from "firebase-functions/v1/firestore";

import { Change } from "firebase-functions/v1";

const listener = async (snapshot: Change<QueryDocumentSnapshot>) => {
  const transaction = snapshot.after.data();
  const { status, payedfor } = transaction;
  if (status === "Completed") {
    const collectionRef = Database.collection(payedfor.collection).doc(
      payedfor.id
    );
    await collectionRef.update({
      hasPaid: true,
    });
  }

  return Promise.resolve();
};

const onTransactionSuccess = functions.firestore
  .document(`${Collection.Transactions}/{id}`)
  .onUpdate((snap) => listener(snap));

export default onTransactionSuccess;
