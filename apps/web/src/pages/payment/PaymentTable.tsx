import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { BOOKING_STATUS, ITransaction, formatBookingDate, timeAgo } from "core";
import {
  Avatar,
  Stack,
  TableFooter,
  TablePagination,
  Typography,
} from "@mui/material";
import Color from "@/utils/color";

import { ReactNode, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

interface PaymentTableProps {
  transactions: ITransaction[];
  modalOnOpen: () => void;
}

export default function PaymentTable({
  transactions,
  modalOnOpen,
}: PaymentTableProps) {
  if (!transactions) {
    return <Typography>No transactions yet</Typography>;
  }
  const rows = [...transactions];
  console.log(rows);

  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    event?.preventDefault();
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <>
      <TableContainer
        sx={{
          border: `1px solid ${Color.grey[300]}`,
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableHeaderCell label="Name" />
              <TableHeaderCell label="Status" />
              <TableHeaderCell label="Date" />
              <TableHeaderCell label="TxnId" />
              <TableHeaderCell label="Reason" />
              <TableHeaderCell label="Amount" />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length ? (
              (rowsPerPage > 0
                ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : rows
              ).map((row: ITransaction, index) => (
                <TableRow
                  key={`bookings_${index}`}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": {
                      backgroundColor: Color.grey[100],
                      cursor: "pointer",
                    },
                  }}
                  onClick={() => {
                    modalOnOpen();
                    navigate({
                      pathname: "",
                      search: createSearchParams({
                        id: row.transactionId ?? "",
                      }).toString(),
                    });
                  }}
                >
                  <TableBodyCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar>{row.payedBy.name.slice(0, 1)}</Avatar>
                      <Stack>
                        <Typography
                          variant="caption"
                          align="left"
                          fontWeight="bold"
                          color={Color.text.focus}
                        >
                          {row.payedBy.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          align="left"
                          color={Color.text.focus}
                        >
                          {row.payedBy.number}
                        </Typography>
                      </Stack>
                    </Stack>
                  </TableBodyCell>
                  <TableBodyCell>
                    <Typography
                      variant="caption"
                      align="left"
                      color={Color.white.focus}
                      px={1}
                      py={0.5}
                      borderRadius={5}
                      bgcolor={
                        row.status === "Completed"
                          ? Color.success.main
                          : Color.warning.main
                      }
                      textTransform="capitalize"
                    >
                      {row.status}
                    </Typography>
                  </TableBodyCell>

                  <TableBodyCell
                    //   @ts-ignore
                    label={formatBookingDate(row.payedAt.seconds)}
                  />
                  <TableBodyCell label={row.tnxId} />
                  <TableBodyCell
                    label={`${row.payedfor.collection.toUpperCase()}`}
                  />
                  <TableBodyCell>
                    <Typography
                      variant="caption"
                      align="left"
                      fontWeight="bold"
                      color={Color.primary.main}
                    >
                      + {row.amount.toString()}
                    </Typography>
                  </TableBodyCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <Typography
                  sx={{
                    marginLeft: 2,
                    mt: 2,
                  }}
                >
                  No bookings yet
                </Typography>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10, 20, 30, { label: "All", value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}

const TableHeaderCell = ({ label }: { label: string }) => {
  return (
    <TableCell>
      <Typography
        variant="caption"
        align="center"
        textTransform="uppercase"
        fontWeight="bold"
        color={Color.text.focus}
      >
        {label}
      </Typography>
    </TableCell>
  );
};

const TableBodyCell = ({
  label,
  children,
}: {
  label?: string;
  children?: ReactNode;
}) => {
  return (
    <TableCell component="th" scope="row">
      {Boolean(label) ? (
        <Typography
          variant="caption"
          align="left"
          fontWeight="semibold"
          color={Color.text.focus}
        >
          {label}
        </Typography>
      ) : (
        children
      )}
    </TableCell>
  );
};
