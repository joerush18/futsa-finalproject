import {
  Avatar,
  Box,
  Typography,
  Divider,
  Stack,
  Button,
  Modal,
  Card,
} from "@mui/material";
import {
  BOOKING_STATUS,
  formatBookingDate,
  timeAgo,
  useBookingStore,
} from "core";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import Color from "@/utils/color";
import useBookings from "@/hooks/useBookings";

interface IBookingDetailModalProps {
  modalOpen: boolean;
  modalOnClose: () => void;
  bookingId: string;
}

export const BookingDetailModal = ({
  modalOnClose,
  modalOpen,
  bookingId,
}: IBookingDetailModalProps) => {
  const { bookings } = useBookingStore();
  const bookingDetail = bookings.find((booking) => booking.id === bookingId);
  const { handleAccept, handleReject } = useBookings();
  if (!bookingDetail) {
    return null;
  }
  return (
    <Modal open={modalOpen} onClose={modalOnClose}>
      <Card
        sx={{
          minWidth: "400px",
        }}
      >
        <Typography variant="h6" px={2} py={1}>
          Booking Details
        </Typography>
        <Divider />
        <Box p={2}>
          <Typography
            variant="caption"
            align="left"
            color={Color.white.focus}
            px={1}
            py={0.5}
            borderRadius={1}
            bgcolor={
              bookingDetail.status === BOOKING_STATUS.PENDING
                ? Color.warning.main
                : bookingDetail.status === BOOKING_STATUS.BOOKED
                ? Color.success.main
                : bookingDetail.status === BOOKING_STATUS.CANCELLED ||
                  bookingDetail.status === BOOKING_STATUS.REJECTED
                ? Color.error.main
                : Color.warning.main
            }
            textTransform="capitalize"
          >
            {bookingDetail.status}
          </Typography>
          <br />
          <Typography variant="caption">#{bookingDetail?.id}</Typography>
          <Stack direction="row" spacing={2} alignItems="center" my={1}>
            <Avatar>{bookingDetail.bookedByUser.name.slice(0, 1)}</Avatar>
            <Stack>
              <Typography
                variant="caption"
                align="left"
                fontWeight="bold"
                color={Color.text.focus}
              >
                {bookingDetail.bookedByUser.name}
              </Typography>
              <Typography
                variant="caption"
                align="left"
                color={Color.text.focus}
              >
                {bookingDetail.bookedByUser.email}
              </Typography>
            </Stack>
          </Stack>
          <Typography fontWeight="bold">
            {formatBookingDate(bookingDetail.bookedFor)}
          </Typography>
          <Typography
            sx={{
              opacity: "50%",
            }}
          >
            {timeAgo(bookingDetail.createdAt)}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Stack direction="row" gap={1}>
              {bookingDetail.hasPaid ? (
                <CheckIcon color="success" />
              ) : (
                <CloseIcon color="error" />
              )}
              <Typography textTransform="capitalize">
                {bookingDetail.paymentMethod ?? "Esewa"}
              </Typography>
            </Stack>
            <Typography variant="h6" my={1}>
              Rs. {bookingDetail.price}
            </Typography>
          </Box>
          {bookingDetail?.status === BOOKING_STATUS.PENDING ? (
            <Box mt={1} mx="auto" textAlign="center">
              <Button
                variant="contained"
                size="small"
                onClick={() => {
                  handleAccept(bookingDetail.id ?? "");
                  modalOnClose();
                }}
              >
                Accept
              </Button>
              <Button
                variant="contained"
                size="small"
                sx={{
                  bgcolor: Color.error.main,
                  ml: 2,
                }}
                onClick={() => {
                  handleReject(bookingDetail.id ?? "");
                  modalOnClose();
                }}
              >
                Reject
              </Button>
            </Box>
          ) : null}
        </Box>
      </Card>
    </Modal>
  );
};
