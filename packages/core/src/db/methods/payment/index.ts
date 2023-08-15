import { IInitiatePaymentResponse, IInitiatiatePayment } from "../../../types";

export const initiatePayment = async (
  initial: IInitiatiatePayment
): Promise<IInitiatePaymentResponse> => {
  const res = await fetch(
    `https://us-central1-futsa-e5f8a.cloudfunctions.net/initiatePayment`,
    {
      method: "POST",
      body: JSON.stringify(initial),
    }
  );
  const data: IInitiatePaymentResponse = await res.json();
  return data;
};
