import { CloudFunction, HttpsFunction } from "firebase-functions/v1";
import { QueryDocumentSnapshot } from "firebase-functions/v1/firestore";
import onCreateBooking from "./triggers/onCreateBooking";
import { initiatePayment } from "./methods/payment";
import { futsaPaymentReturn } from "./methods/futsaPaymentReturn";
import onTransactionSuccess from "./triggers/onTransactionSuccess";
import onUpdateBooking from "./triggers/onUpdateBooking";

const functions: {
  [key: string]: CloudFunction<QueryDocumentSnapshot> | HttpsFunction;
} = {
  onCreateBooking,
  onUpdateBooking,
  initiatePayment,
  futsaPaymentReturn,
  onTransactionSuccess,
};

Object.keys(functions).forEach((key: string) => {
  exports[key] = functions[key];
});
