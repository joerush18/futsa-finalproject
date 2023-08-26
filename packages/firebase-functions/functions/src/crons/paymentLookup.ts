import {} from "firebase-admin/firestore";
import { Collection, Database, functions } from "../config/admin";
import { ITransaction } from "../types/transactions.types";

const paymentLookup = functions.pubsub
  .schedule("0 13 * * *")
  .timeZone("Etc/UTC")
  .onRun(async () => {
    // Get all transactions with status pending
    const transactionsRef = await Database.collection(Collection.Transactions)
      .where("status", "==", "pending")
      .get();

    const transactions = transactionsRef.docs.map(
      (doc) => doc.data() as ITransaction
    );

    // For each transaction, check if its status is completed
    transactions.forEach(async (transaction) => {
      const res = await checkPaymentStatus(transaction.pidx);
      // check if its status is completed
      if (res.status === "Completed") {
        await Database.collection(Collection.Transactions)
          .doc(transaction.pidx)
          .update({
            status: "completed",
          });
      }
    });
    // Update each collection's payment status to completed
    // on Trigger onTransactionSuccess
  });

export default paymentLookup;

const checkPaymentStatus = async (pidx: string) => {
  const URL = "https://a.khalti.com/api/v2/epayment/lookup/";
  try {
    const pres = await fetch(URL, {
      method: "POST",
      headers: {
        Authorization: "Key 24150083528741da89760cc18cbeee1d",
        "Content-type": "application/json",
      },
      body: JSON.stringify(pidx),
    });
    const data = await pres.json();
    return data;
  } catch (e: any) {
    return e.message;
  }
};
