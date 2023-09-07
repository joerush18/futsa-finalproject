import Color from "@/utils/color";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { IEvents, ITeam, timeAgo } from "core";
import VerifiedIcon from "@mui/icons-material/Verified";
import ErrorIcon from "@mui/icons-material/Error";
import { EventHighlights } from "./EventHighlights";
import { useState } from "react";
import useModal from "@/hooks/useModal";
import { TeamDetailsModal } from "./TeamDetailsModal";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

export const EventDetailsCard = ({ event }: { event: IEvents }) => {
  // @ts-ignore
  const venue = event.geoLocation?.value?.description.split(",")[1] ?? "";
  const [selectedTeam, setSelectedTeam] = useState<ITeam>();
  const { open, onOpen, onClose } = useModal();
  const navigate = useNavigate();
  return (
    <Box
      flex={1}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "85vh",
        overflowY: "scroll",
        position: "relative",
      }}
    >
      <IconButton
        onClick={() => {
          navigate("/events/create?id=" + event.id + "&edit=true");
        }}
        sx={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 1,
          backgroundColor: Color.background.default,
        }}
      >
        <EditIcon />
      </IconButton>
      <img
        src={event.eventImage}
        alt="Event Image"
        style={{
          objectFit: "cover",
          borderRadius: "4px",
          height: "300px",
          width: "100%",
        }}
      />
      <Stack
        flexDirection="row"
        alignItems="flex-start"
        gap={3}
        sx={{
          mt: 2,
        }}
      >
        <Box
          sx={{
            width: "50%",
          }}
        >
          <Typography variant="caption" fontWeight="bold" mt={1}>
            {timeAgo(event.createdAt)}
          </Typography>
          <Typography variant="h3" marginTop={1} lineHeight={0.5}>
            {event.name}
          </Typography>
          <Typography variant="body1" lineHeight={1}>
            {event.createdBy?.name}
          </Typography>
          <Typography
            variant="caption"
            lineHeight={1}
            mt={0.5}
            color={Color.text.main}
            fontWeight="bold"
          >
            {venue}
          </Typography>
          <EventHighlights event={event} isDesc={true} />
        </Box>
        <Box marginTop={2}>
          <Typography variant="h6" mb={1}>
            Registered Teams
          </Typography>
          <Stack
            flexDirection="row"
            alignItems="center"
            gap={1}
            flexWrap="wrap"
          >
            {event.teams.length ? (
              event.teams.map((team, index) => (
                <Chip
                  key={`team-${index}`}
                  label={team.name}
                  sx={{
                    marginRight: 1,
                    backgroundColor: Color.grey[400],
                    fontWeight: 400,
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                  onClick={() => {
                    onOpen();
                    setSelectedTeam(team);
                  }}
                  avatar={
                    team.verified ? (
                      <VerifiedIcon color="info" />
                    ) : (
                      <ErrorIcon color="error" />
                    )
                  }
                />
              ))
            ) : (
              <Typography
                sx={{
                  bgcolor: Color.grey[400],
                  width: "max-content",
                  px: 2,
                  py: 1,
                  borderRadius: "4px",
                }}
              >
                No teams registered yet.
              </Typography>
            )}
          </Stack>
          <Button
            variant="contained"
            sx={{
              mt: 2,
              textTransform: "capitalize",
            }}
            disabled={event.teams.length < 4}
            onClick={() => {
              alert("We are still working on this feature.");
            }}
          >
            Create Tiesheet
          </Button>
          {event.teams.length < 4 ? (
            <Typography variant="body1" color={Color.warning.main}>
              You can create tiesheet only when at least 4 teams are registered
              and verified.
            </Typography>
          ) : null}
        </Box>
      </Stack>

      <Box paddingX={1} mt={2}>
        <Typography variant="h6">Description</Typography>
        <Box>
          <Typography
            variant="body1"
            lineHeight={1.2}
            fontSize={"12px"}
            fontWeight={400}
            textAlign="justify"
            mt={1}
            width={"50%"}
          >
            {event.description}
          </Typography>
        </Box>
        <Box marginTop={2}>
          <Typography variant="h6">Perks</Typography>
        </Box>
      </Box>
      <TeamDetailsModal
        open={open}
        onClose={onClose}
        selectedTeam={selectedTeam}
        teams={event.teams}
        key={`team-details-${selectedTeam?.id}`}
      />
    </Box>
  );
};
