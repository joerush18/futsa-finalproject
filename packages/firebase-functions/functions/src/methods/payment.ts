import { functions } from "../config/admin";

export const initiatePayment = functions.https.onRequest(async (req, res) => {
  if (!req.body) {
    return;
  }
  const {
    amount,
    customerEmail,
    customerName,
    customerPhone,
    orderId,
    futsalId,
    futsalName,
    bookedFor,
  } = JSON.parse(req.body);
  res.set("Access-Control-Allow-Origin", "*");
  const URL = "https://a.khalti.com/api/v2/epayment/initiate/";
  const paymentPayload = {
    return_url: "http://127.0.0.1:5173/payments/",
    website_url: "http://127.0.0.1:5173/",
    amount: +amount,
    purchase_order_id: orderId,
    purchase_order_name: bookedFor,
    customer_info: {
      name: customerName,
      email: customerEmail,
      phone: +customerPhone,
    },
    product_details: [
      {
        identity: futsalId,
        name: futsalName,
        total_price: +amount,
        quantity: 1,
        unit_price: +amount,
      },
    ],
  };

  try {
    const pres = await fetch(URL, {
      method: "POST",
      headers: {
        Authorization: "Key 24150083528741da89760cc18cbeee1d",
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
