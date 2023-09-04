import useCurrentUser from "@/hooks/useCurrentUser";
import Color from "@/utils/color";
import { Box, Typography } from "@mui/material";
import { timeAgo, useGetTransactionByFutsal } from "core";

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
          return (
            <Box
              sx={{
                background: Color.white.main,
                padding: 2,
                border: `1px solid ${Color.grey[300]}`,
                width: "max-content",
                borderRadius: 2,
                cursor: "pointer",
                "&:hover": {
                  background: Color.grey[200],
                },
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                }}
              >
                You received payment of Rs. {d.amount} from {d.payedBy.name}.
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: Color.secondary.focus,
                }}
              >
                Txnid : {d.tnxId}
              </Typography>
              <br />
              <Typography
                variant="caption"
                sx={{
                  mt: 1,
                  color: Color.primary.main,
                  textTransform: "capitalize",
                }}
              >
                {d.payedfor.collection} id : {d.payedfor.id}
              </Typography>
            </Box>
          );
        })
      ) : (
        <Box>No transactions found.</Box>
      )}
    </Box>
  );
};
export default PaymentPage;
