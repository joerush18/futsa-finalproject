import Color from "@/utils/color";
import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import { IBids, timeAgo } from "core";
import { LogoText } from "./LogoText";
import { CurrencyRupeeRounded, Edit } from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";

interface BiddingCardListsProps {
  bids: IBids[];
  myBidIndex?: boolean;
  handleClick?: (bid: IBids) => void;
}
export const BiddingCardLists = ({
  bids,
  myBidIndex,
  handleClick,
}: BiddingCardListsProps) => {
  return (
    <Box>
      {bids.map((bid, index) => {
        const {
          id,
          isSelected,
          budget,
          message,
          createdBy,
          createdAt,
          venue,
          freebies,
          updatedAt,
        } = bid;
        return (
          <Box
            key={`${id}-${index}_bids`}
            sx={{
              border: `1px solid ${
                isSelected ? Color.primary.main : Color.grey[300]
              }`,
              p: 2,
              m: 2,
              borderRadius: 1,
              position: "relative",
              maxWidth: "800px",
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              {myBidIndex && !isSelected ? (
                <IconButton
                  onClick={() => {
                    handleClick?.(bid);
                  }}
                  sx={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                  }}
                >
                  <Edit
                    sx={{
                      color: Color.text.main,
                    }}
                  />
                </IconButton>
              ) : (
                ""
              )}
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
                text={budget.toString()}
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
                // @ts-ignore
                text={venue?.value.description.split(",")[0] ?? "Pokhara"}
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
            <Stack
              flexDirection="row"
              alignItems="center"
              flexWrap="wrap"
              mb={1.5}
            >
              {freebies?.length ? (
                freebies.map((facility, index) => (
                  <Typography
                    key={`${facility}-${index}_bids`}
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
            <Typography variant="caption" color={Color.text.focus}>
              {updatedAt
                ? `Edited : ${timeAgo(updatedAt)}`
                : timeAgo(createdAt)}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};
