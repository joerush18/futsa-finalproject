import { toast } from "react-hot-toast";
import { Button } from "@mui/material";
import {
  IInitiatePaymentResponse,
  IInitiatiatePayment,
  useCreatePayment,
} from "core";

const PaymentPage = () => {
  const { mutate: createPayment, isLoading } = useCreatePayment();
  const handlePayment = async () => {
    const data: IInitiatiatePayment = {
      amount: "1000",
      customerEmail: "test@joey.com",
      customerPhone: "9800000000",
      customerName: "Test Customer",
      orderId: "1234567890",
      futsalId: "615f9b9b9b9b9b9b9b9b9b9b",
      futsalName: "Test Futsal",
      bookedFor: "2021-10-10",
    };

    createPayment(data, {
      onSuccess: (data: IInitiatePaymentResponse) => {
        console.log(data);
        data.received && window.open(data.data.payment_url);
      },
      onError: () => {
        toast.error("Something went wrong");
      },
    });
  };
  return (
    <div>
      <Button
        variant="contained"
        onClick={() => handlePayment()}
        sx={{
          backgroundColor: "purple",
        }}
      >
        {isLoading ? "Loading..." : "Pay with Khalti"}
      </Button>
    </div>
  );
};
export default PaymentPage;
