import { functions } from "../config/admin";

export const initiatePayment = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const URL = "https://khalti.com/api/v2/epayment/initiate/";
  const paymentPayload = {
    return_url: "http://127.0.0.1:5173/payments/",
    website_url: "http://127.0.0.1:5173/",
    amount: 1300,
    purchase_order_id: "test12",
    purchase_order_name: "test",
    customer_info: {
      name: "Ashim Upadhaya",
      email: "example@gmail.com",
      phone: "9811496763",
    },
    product_details: [
      {
        identity: "1234567890",
        name: "Khalti logo",
        total_price: 1300,
        quantity: 1,
        unit_price: 1300,
      },
    ],
  };
  try {
    const pres = await fetch(URL, {
      method: "POST",
      headers: {
        Authorization: "Key test_secret_key_52fdc3d0cfdb405793323211370868ee",
        "Content-type": "application/json",
      },
      body: JSON.stringify(paymentPayload),
    });
    const data = await pres.json();
    res.status(200).send({ received: true, data });
  } catch (e: any) {
    res.status(500).send({ received: false, error: e.message });
  }
});
