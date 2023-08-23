import Color from "@/utils/color";
import { Box, Button, Drawer, Stack, Typography } from "@mui/material";
import {
  IBids,
  IRequest,
  REQUEST_STATUS,
  formatBookingDate,
  timeAgo,
} from "core";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { LogoText } from "./LogoText";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HourglassFullIcon from "@mui/icons-material/HourglassFull";
import { BiddingCardLists } from "./BiddingCardLists";

const bids: IBids[] = [
  {
    id: "alsjdksjd",
    message: "adjkshkdja",
    budget: 15000,
    isSelected: false,
    requestId: "a123",
    createdAt: +new Date(),
    createdBy: {
      id: "I want to conduct futsal.",
      name: "Saroj Aryal",
      email: "saroj@gmail.com",
    },
    venue: "Pokhara",
    freebies: [
      "Match official",
      "Scoring Board",
      "First Aid",
      "Parking",
      "Free Water",
      "Changing Room",
    ],
  },
  {
    id: "asdasd",
    message: "I want to conduct futsal.",
    budget: 12000,
    isSelected: true,
    requestId: "a124",
    createdAt: +new Date(),
    createdBy: {
      id: "askldjasl",
      name: "Ramu Kaka",
      email: "ramu@gmail.com",
    },
    venue: "Pokhara",
  },
  {
    id: "asdasd",
    message: "I want to conduct futsal.",
    budget: 12000,
    isSelected: false,
    requestId: "a124",
    createdAt: +new Date(),
    createdBy: {
      id: "askldjasl",
      name: "Rahul Subedi",
      email: "rahuls@gmail.com",
    },
    venue: "Pokhara",
  },
  {
    id: "asdasd",
    message: "I want to conduct futsal.",
    budget: 12000,
    isSelected: false,
    requestId: "a124",
    createdAt: +new Date(),
    createdBy: {
      id: "askldjasl",
      name: "Rahul Subedi",
      email: "rahuls@gmail.com",
    },
    venue: "Pokhara",
  },
];

export const RequestDetailsDrawer = ({
  open,
  onClose,
  request,
}: {
  open: boolean;
  onClose: () => void;
  request: IRequest;
}) => {
  if (!request) return null;
  const {
    title,
    budget,
    deadline,
    description,
    endDate,
    location,
    startDate,
    status,
    createdAt,
    createdBy,
  } = request;

  const biddings = bids.filter((bid) => bid.requestId === request.id);
  const borderColor = `1px solid ${Color.grey[300]}`;

  return (
    <Drawer anchor={"right"} open={open} onClose={onClose}>
      <Box
        sx={{
          margin: 2,
          maxWidth: "800px",
          border: borderColor,
          borderRadius: 2,
        }}
      >
        <Box
          p={2}
          sx={{
            position: "relative",
          }}
        >
          <Typography variant="h6">{title}</Typography>
          <Typography variant="caption" color={Color.text.main}>
            {timeAgo(createdAt)} - {createdBy?.name}
          </Typography>
          <LogoText
            text={location}
            icon={
              <LocationOnIcon
                sx={{
                  color: Color.primary.main,
                  fontSize: "18px",
                }}
              />
            }
          />
          <Typography
            variant="caption"
            sx={{
              bgcolor:
                status === REQUEST_STATUS.ACTIVE
                  ? Color.warning.main
                  : status === REQUEST_STATUS.ACCEPTED
                  ? Color.success.main
                  : Color.error.main,
              color: "white",
              px: 2,
              py: 1,
              borderRadius: 4,
              fontWeight: "bold",
              position: "absolute",
              top: 8,
              right: 6,
            }}
          >
            {status}
          </Typography>
        </Box>
        <Box
          p={2}
          sx={{
            borderTop: borderColor,
          }}
        >
          <Typography>{description}</Typography>
        </Box>
        <Stack
          sx={{
            borderTop: borderColor,
            p: 2,
          }}
          flexDirection="row"
          alignItems="center"
          gap={4}
          flexWrap="wrap"
        >
          <LogoText
            text={budget?.toString()}
            icon={
              <CurrencyRupeeIcon
                sx={{
                  color: Color.primary.main,
                  fontSize: "18px",
                }}
              />
            }
          />
          <LogoText
            text={
              formatBookingDate(startDate?.toISOString()).split(",")[0] +
              " - " +
              formatBookingDate(endDate?.toISOString()).split(",")[0]
            }
            icon={
              <AccessTimeIcon
                sx={{
                  color: Color.primary.main,
                  fontSize: "18px",
                }}
              />
            }
          />
          <LogoText
            text={`Deadline : ${
              formatBookingDate(deadline?.toISOString()).split(",")[0]
            }`}
            icon={
              <HourglassFullIcon
                sx={{
                  color: Color.primary.main,
                  fontSize: "18px",
                }}
              />
            }
          />
        </Stack>
        <Stack
          sx={{
            borderTop: borderColor,
          }}
        >
          <Button
            variant="contained"
            sx={{ margin: 2, maxWidth: "200px" }}
            disabled={status === REQUEST_STATUS.ACCEPTED}
          >
            Bid now
          </Button>
        </Stack>
      </Box>
      <Box>
        <Typography variant="h6" px={2}>
          Other Biddings
        </Typography>
        <BiddingCardLists bids={biddings} />
      </Box>
    </Drawer>
  );
};
