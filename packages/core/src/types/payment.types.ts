export interface IInitiatiatePayment {
  amount: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  orderId: string;
  futsalId: string;
  futsalName: string;
  bookedFor: string;
}
export interface IInitiatePaymentResponse {
  received: boolean;
  data: {
    pidx: string;
    payment_url: string;
    expires_at: string;
    expires_in: number;
  };
}
