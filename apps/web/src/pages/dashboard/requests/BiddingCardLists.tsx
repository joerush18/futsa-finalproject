import Color from "@/utils/color";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { IBids, timeAgo } from "core";
import { LogoText } from "./LogoText";
import { CurrencyRupeeRounded } from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";

interface BiddingCardListsProps {
  bids: IBids[];
}
export const BiddingCardLists = ({ bids }: BiddingCardListsProps) => {
  const selectedIndex = bids.findIndex((bid) => bid.isSelected === true);
  if (selectedIndex !== -1) {
    const selectedBid = bids.splice(selectedIndex, 1)[0];
    bids.unshift(selectedBid);
  }
  return (
    <Box>
      {bids.map((bid) => {
        const {
          isSelected,
          budget,
          message,
          createdBy,
          createdAt,
          venue,
          freebies,
        } = bid;
        return (
          <Box
            sx={{
              border: `1px solid ${
                isSelected ? Color.primary.main : Color.grey[300]
              }`,
              p: 2,
              m: 2,
              borderRadius: 1,
              position: "relative",
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar>{createdBy?.name.slice(0, 1)}</Avatar>
              <Stack>
                <Typography
                  variant="caption"
                  align="left"
                  fontWeight="bold"
                  color={Color.text.focus}
                >
                  {createdBy?.name}
                </Typography>
                <Typography
                  variant="caption"
                  align="left"
                  color={Color.text.focus}
                >
                  {createdBy?.email}
                </Typography>
              </Stack>
            </Stack>
            <Stack flexDirection="row" gap={2} alignItems="center" mt={2}>
              <LogoText
                text={budget?.toString()}
                icon={
                  <CurrencyRupeeRounded
                    sx={{
                      color: Color.primary.main,
                      fontSize: "18px",
                    }}
                  />
                }
              />
              <LogoText
                text={venue}
                icon={
                  <LocationOnIcon
                    sx={{
                      color: Color.primary.main,
                      fontSize: "18px",
                    }}
                  />
                }
              />
            </Stack>
            <Typography variant="body2" p={1}>
              {message}
            </Typography>
            <Typography variant="body1" fontWeight="600">
              Freebies
            </Typography>
            <Stack flexDirection="row" alignItems="center" flexWrap="wrap">
              {freebies?.length ? (
                freebies.map((facility) => (
                  <Typography
                    variant="body2"
                    p={1}
                    sx={{
                      p: 1,
                      bgcolor: Color.grey[200],
                      mr: 1,
                      borderRadius: 1,
                    }}
                  >
                    {facility}
                  </Typography>
                ))
              ) : (
                <Typography
                  variant="body2"
                  p={1}
                  sx={{
                    p: 1,
                    bgcolor: Color.grey[200],
                    mr: 1,
                    borderRadius: 1,
                  }}
                >
                  No freebies included.
                </Typography>
              )}
            </Stack>
            {isSelected ? (
              <CheckCircleIcon
                sx={{
                  color: Color.primary.main,
                  fontSize: "36px",
                  position: "absolute",
                  top: 4,
                  right: 4,
                }}
              />
            ) : (
              ""
            )}
            <Typography
              variant="caption"
              color={Color.text.focus}
              marginTop={1}
            >
              {timeAgo(createdAt)}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};
