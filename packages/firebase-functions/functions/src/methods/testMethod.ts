import { functions } from "../config/admin";

const testMethod = functions.https.onRequest((req: any, res: any) => {
  res.send("Hello from Firebase!");
});

export { testMethod };
