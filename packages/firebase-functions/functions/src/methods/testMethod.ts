import { functions } from "../config/admin";

const testMethod = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

export { testMethod };
