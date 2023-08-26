import { functions, Database, Collection } from "../config/admin";
import { ITransaction } from "../types/transactions.types";
import { error, success } from "../utils/html";

const futsaPaymentReturn = functions.https.onRequest(
  async (req: any, res: any) => {
    if (!req.query) {
      res.send(error);
      return;
    }
    const {
      pidx,
      txnId,
      amount,
      mobile,
      purchase_order_id,
      purchase_order_name,
      transaction_id,
    } = req.query;

    const poid: string[] = purchase_order_id.toString().split("_") ?? "";
    const pon: string[] = purchase_order_name.toString().split("_") ?? "";

    const data: ITransaction = {
      payedTo: {
        id: pon[1],
        name: pon[0],
      },
      payedBy: {
        id: pon[3],
        name: pon[2],
        number: mobile.toString(),
      },
      pidx: pidx.toString(),
      tnxId: txnId.toString(),
      amount: amount.toString(),
      status: "pending",
      payedAt: new Date(),
      transactionId: transaction_id.toString(),
      payedfor: {
        collection: poid[0],
        id: poid[1],
      },
    };

    try {
      const transactionRef = Database.collection(Collection.Transactions).doc(
        pidx
      );
      await transactionRef.set({
        ...data,
      });
      await checkAndHandlePaymentStatus(pidx.toString());
      res.send(success);
    } catch (e) {
      res.send(error);
    }
  }
);

export { futsaPaymentReturn };

const checkPaymentStatus = async (pidx: string) => {
  const URL = "https://a.khalti.com/api/v2/epayment/lookup/";
  try {
    const pres = await fetch(URL, {
      method: "POST",
      headers: {
        Authorization: "Key 24150083528741da89760cc18cbeee1d",
        "Content-type": "application/json",
      },
      body: JSON.stringify({ pidx }),
    });
    const data = await pres.json();
    return data;
  } catch (e: any) {
    return e.message;
  }
};

async function checkAndHandlePaymentStatus(pidx: string) {
  const maxAttempts = 10;
  const delayBetweenAttempts = 5000;

  let attempts = 0;

  while (attempts < maxAttempts) {
    const res = await checkPaymentStatus(pidx.toString());
    if (res.status === "Completed") {
      await Database.collection(Collection.Transactions)
        .doc(pidx.toString())
        .update({
          status: "Completed",
        });
      break; // Exit the loop if payment is completed
    }

    attempts++;
    await new Promise((resolve) => setTimeout(resolve, delayBetweenAttempts));
  }
}

// http://127.0.0.1:5173/payments?pidx=3MP8GV5NS5P9Ap76TRfYGJ&txnId=3Lj6gNToyhfEair3vYi434&amount=1000&mobile=98XXXXX001&purchase_order_id=1234567890&purchase_order_name=2021-10-10&transaction_id=3Lj6gNToyhfEair3vYi434

// https://us-central1-futsa-e5f8a.cloudfunctions.net/futsaPaymentReturn?pidx=uEZxqDnqPQb9a5xSBLHHy6&txnId=ZXshW48qTGGPCcEezUPCNk&amount=1000&mobile=98XXXXX001&purchase_order_id=bookings-194fd955-6e2a-c2f0-6f2a-9b6cd83278ee&purchase_order_name=ABC%20Futsal%20Pvt.%20Ltd-CC4W7r9PNMfEpJ7XItCz1XH4uNE3-Saroj%20Aryal-mnA4oFMxCnTLC7KfgGflak8XUdu2&transaction_id=ZXshW48qTGGPCcEezUPCNk
