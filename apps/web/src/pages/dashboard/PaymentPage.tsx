import useCurrentUser from "@/hooks/useCurrentUser";
import { Box } from "@mui/material";
import { useGetTransactionByFutsal } from "core";

const PaymentPage = () => {
  const { futsal } = useCurrentUser();
  const { data: transactions, isLoading: isFetchingPayments } =
    useGetTransactionByFutsal(futsal.id);

  if (isFetchingPayments && !transactions) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box>
      {transactions?.length ? (
        transactions.map((d) => {
          return <Box>{d.amount}</Box>;
        })
      ) : (
        <Box>No transactions found.</Box>
      )}
    </Box>
  );
};
export default PaymentPage;
