import useCurrentUser from "@/hooks/useCurrentUser";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useGetTransactionByFutsal } from "core";
import PaymentTable from "./PaymentTable";
import useModal from "@/hooks/useModal";
import Color from "@/utils/color";

const PaymentPage = () => {
  const { futsal } = useCurrentUser();
  const { onOpen } = useModal();
  const { data: transactions, isLoading: isFetchingPayments } =
    useGetTransactionByFutsal(futsal.id);

  const totalBalance =
    transactions &&
    transactions?.reduce((acc, curr) => {
      if (curr.status === "Completed") {
        return acc + +curr.amount;
      }
      return acc;
    }, 0);

  const pendingBalance =
    transactions &&
    transactions?.reduce((acc, curr) => {
      if (curr.status === "Pending") {
        return acc + +curr.amount;
      }
      return acc;
    }, 0);

  if (isFetchingPayments && !transactions) {
    return <Box>Loading...</Box>;
  }

  return (
    <>
      <Stack alignItems="center" gap={8} flexDirection="row">
        <Box>
          <Typography variant="caption">Total balance</Typography>
          <Typography variant="h3" textAlign="left" color={Color.primary.main}>
            Rs. {totalBalance}
          </Typography>
        </Box>
        <Box
          sx={{
            p: 3,
          }}
        >
          <Typography variant="caption">Pending transactions</Typography>
          <Typography variant="h3" textAlign="left" color={Color.primary.main}>
            Rs. {pendingBalance}
          </Typography>
        </Box>
        <Button
          variant="outlined"
          onClick={onOpen}
          disabled={true}
          sx={{
            position: "fixed",
            right: 20,
            top: 130,
          }}
        >
          Withdraw
        </Button>
      </Stack>
      {transactions?.length ? (
        <PaymentTable transactions={transactions} modalOnOpen={onOpen} />
      ) : (
        <Typography variant="h6">No transactions found.</Typography>
      )}
    </>
  );
};
export default PaymentPage;
