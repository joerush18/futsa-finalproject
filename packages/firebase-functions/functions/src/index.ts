import { CloudFunction, HttpsFunction } from "firebase-functions/v1";
import { QueryDocumentSnapshot } from "firebase-functions/v1/firestore";
import onCreateBooking from "./triggers/onCreateBooking";

const functions: {
  [key: string]: CloudFunction<QueryDocumentSnapshot> | HttpsFunction;
} = {
  onCreateBooking,
};

Object.keys(functions).forEach((key: string) => {
  exports[key] = functions[key];
});