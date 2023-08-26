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
import { BiddingForm } from "./BiddingForm";
import { useState } from "react";
import Loading from "@/components/Loading";
import useBids from "@/hooks/useBids";

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
    id,
  } = request;

  const { bids: biddings, isFetchingBids, myBidId } = useBids(id);

  const borderColor = `1px solid ${Color.grey[300]}`;

  const [view, setView] = useState<"bids" | "form">("bids");
  const [myDefaultBid, setMyDefaultBid] = useState<IBids | undefined>(
    undefined
  );

  if (isFetchingBids) {
    return <Loading label="" />;
  }

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
              formatBookingDate(startDate).split(",")[0] +
              " - " +
              formatBookingDate(endDate).split(",")[0]
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
            text={`Deadline : ${formatBookingDate(deadline).split(",")[0]}`}
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
            onClick={() => setView(view === "bids" ? "form" : "bids")}
            variant="contained"
            sx={{ margin: 2, maxWidth: "200px" }}
            disabled={
              view === "form"
                ? false
                : status === REQUEST_STATUS.ACCEPTED
                ? true
                : myBidId
                ? true
                : false
            }
          >
            {view === "bids" ? "Create Bid" : "View Bids"}
          </Button>
        </Stack>
      </Box>
      {view === "form" ? (
        <BiddingForm
          onCompleteCreate={setView}
          requestId={request.id ?? ""}
          myDefaultBid={myDefaultBid}
        />
      ) : (
        <Box>
          <Typography variant="h6" px={2}>
            Other Biddings
          </Typography>
          {biddings && biddings?.length > 0 ? (
            <BiddingCardLists
              requestStatus={status}
              bids={biddings}
              myBidId={myBidId}
              handleClick={(bid) => {
                setMyDefaultBid(bid);
                setView("form");
              }}
            />
          ) : (
            <Typography variant="caption" mx={2}>
              No bids yet.
            </Typography>
          )}
        </Box>
      )}
    </Drawer>
  );
};
