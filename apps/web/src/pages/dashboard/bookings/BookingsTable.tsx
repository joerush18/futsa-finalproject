import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { BOOKING_STATUS, IBookings, formatBookingDate, timeAgo } from "core";
import { Avatar, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import Color from "@/utils/color";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { ReactNode } from "react";
import useBookings from "@/hooks/useBookings";
import { createSearchParams, useNavigate } from "react-router-dom";

interface BookingsTableProps {
  bookings: IBookings[];
  type: BOOKING_STATUS;
  modalOnOpen: () => void;
}

export default function BookingsTable({
  bookings,
  type,
  modalOnOpen,
}: BookingsTableProps) {
  if (!bookings) {
    return <Typography>No bookings yet</Typography>;
  }
  const rows = [...bookings];
  const isPending = type === BOOKING_STATUS.PENDING;
  const isBooked = type === BOOKING_STATUS.BOOKED;
  const isRejected = type === BOOKING_STATUS.REJECTED;
  // const isCancelled = type === BOOKING_STATUS.CANCELLED;

  const { handleAccept, handleReject } = useBookings();
  const navigate = useNavigate();

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableHeaderCell label="Booked by" />
              <TableHeaderCell label="Booked For" />
              <TableHeaderCell
                label={
                  isPending
                    ? "Booked At"
                    : isBooked
                    ? "Confirmed"
                    : isRejected
                    ? "Rejected"
                    : "Cancelled"
                }
              />
              <TableHeaderCell label="Status" />
              <TableHeaderCell label="Price" />
              <TableHeaderCell label="Payment" />
              {isPending ? <TableHeaderCell label="Actions" /> : ""}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length ? (
              rows.map((row: IBookings, index) => (
                <TableRow
                  key={`bookings_${index}_${row.id}`}
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
                        id: row.id ?? "",
                      }).toString(),
                    });
                  }}
                >
                  <TableBodyCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar>{row.bookedByUser.name.slice(0, 1)}</Avatar>
                      <Stack>
                        <Typography
                          variant="caption"
                          align="left"
                          fontWeight="bold"
                          color={Color.text.focus}
                        >
                          {row.bookedByUser.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          align="left"
                          color={Color.text.focus}
                        >
                          {row.bookedByUser.email}
                        </Typography>
                      </Stack>
                    </Stack>
                  </TableBodyCell>
                  <TableBodyCell label={formatBookingDate(row.bookedFor)} />
                  <TableBodyCell
                    label={timeAgo(isPending ? row.createdAt : row.updatedAt)}
                  />
                  <TableBodyCell>
                    <Typography
                      variant="caption"
                      align="left"
                      color={Color.white.focus}
                      px={1}
                      py={0.5}
                      borderRadius={5}
                      bgcolor={
                        row.status === BOOKING_STATUS.PENDING
                          ? Color.warning.main
                          : row.status === BOOKING_STATUS.BOOKED
                          ? Color.success.main
                          : row.status === BOOKING_STATUS.CANCELLED ||
                            row.status === BOOKING_STATUS.REJECTED
                          ? Color.error.main
                          : Color.warning.main
                      }
                      textTransform="capitalize"
                    >
                      {row.status}
                    </Typography>
                  </TableBodyCell>
                  <TableBodyCell label={row.price.toString()} />

                  <TableCell align="left">
                    <Stack direction="row" gap={1}>
                      {row.hasPaid ? (
                        <CheckIcon color="success" />
                      ) : (
                        <CloseIcon color="error" />
                      )}
                      <Typography>{row.paymentMethod ?? "Esewa"}</Typography>
                    </Stack>
                  </TableCell>
                  {isPending ? (
                    <TableCell align="left">
                      <Stack direction="row">
                        <Tooltip title="Accept" arrow>
                          <IconButton
                            onClick={() => handleAccept(row?.id ?? "")}
                          >
                            <CheckCircleIcon color="success" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Reject" arrow>
                          <IconButton
                            onClick={() => handleReject(row?.id ?? "")}
                          >
                            <CancelIcon color="error" />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  ) : (
                    ""
                  )}
                </TableRow>
              ))
            ) : (
              <TableBodyCell>
                <Typography>No bookings yet</Typography>
              </TableBodyCell>
            )}
          </TableBody>
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