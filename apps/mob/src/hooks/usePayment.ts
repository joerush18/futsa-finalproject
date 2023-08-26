import {
  IInitiatePaymentResponse,
  IInitiatiatePayment,
  useCreatePayment,
} from "core";
import { useEffect, useState } from "react";

const usePayment = (data: IInitiatiatePayment) => {
  const [webUrl, setWebUrl] = useState<string>("");
  const { mutate: createPayment, isLoading } = useCreatePayment();
  const handlePayment = async (data: IInitiatiatePayment) => {
    createPayment(data, {
      onSuccess: (data: IInitiatePaymentResponse) => {
        data.received && setWebUrl(data.data.payment_url);
      },
      onError: () => {},
    });
  };

  useEffect(() => {
    handlePayment(data);
  }, []);

  return {
    webUrl,
    isLoading,
  };
};

export default usePayment;

// const data: IInitiatiatePayment = {
//   amount: "1000",
//   customerEmail: "joras.aryal23@gmail.com",
//   customerPhone: "9846168323",
//   customerName: "Test Customer",
//   // orderId : payedForEventName - payedForEventId
//   orderId: `${Collections.Bookings}_${`aac62d97-1d54-1ac3-816c-b8f9ee6862aa`}`,
//   futsalId: "615f9b9b9b9b9b9b9b9b9b9b",
//   futsalName: "Test Futsal",
//   // bookedFor : futsalName - futsalId - customerName - customerId
//   bookedFor: `${`ABC Futsal Pvt. Ltd`}_${`CC4W7r9PNMfEpJ7XItCz1XH4uNE3`}_${`Saroj Aryal`}_${`mnA4oFMxCnTLC7KfgGflak8XUdu2`}`,
// };
