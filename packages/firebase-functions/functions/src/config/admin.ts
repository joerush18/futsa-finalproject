import * as admin from "firebase-admin";
import * as func from "firebase-functions";

admin.initializeApp({});

export const Collection = {
  Futsals: "futsals",
  Players: "players",
  Bookings: "bookings",
  Notification: "notifications",
  Transactions: "transactions",
};

export const Database = admin.firestore();
export const functions = func;
export const config = functions.config();

export default admin;
