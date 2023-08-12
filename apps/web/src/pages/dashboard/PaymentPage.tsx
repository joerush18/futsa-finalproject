import { Button } from "@mui/material";
import { initiatePayment } from "core";

const PaymentPage = () => {
  const handlePayment = async () => {
    const res = await initiatePayment();
    console.log(res);
  };
  return (
    <div>
      <Button variant="contained" onClick={() => handlePayment()}>
        Pay via Khalti
      </Button>
    </div>
  );
};

export default PaymentPage;
