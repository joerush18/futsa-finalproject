import Color from "@/utils/color";
import { Box, Chip, Typography } from "@mui/material";
import { IEvents, ITeam } from "core";
import VerifiedIcon from "@mui/icons-material/Verified";
import ErrorIcon from "@mui/icons-material/Error";
import { EventHighlights } from "./EventHighlights";

export const EventDetailsCard = ({ event }: { event: IEvents }) => {
  const teams: ITeam[] = [
    {
      id: "",
      name: "Team 1",
      verified: true,
      ownerId: "2",
      createdBy: {
        name: "Player 2",
        email: "sds",
        id: "sdsdj",
      },
      members: [
        {
          name: "Player 1",
          age: 20,
          gender: "male",
          jerseyNumber: 1,
          id: "1",
          phoneNumber: "9841234567",
          position: "Goalkeeper",
          isCaptain: true,
          teamId: "1",
        },
        {
          name: "Player 2",
          age: 22,
          gender: "male",
          jerseyNumber: 7,
          id: "1",
          phoneNumber: "9841234567",
          position: "Forward",
          isCaptain: true,
          teamId: "62",
        },
      ],
    },
    {
      id: "",
      name: "Team 2",
      verified: false,
      ownerId: "2",
      createdBy: {
        name: "Player 2",
        email: "sds",
        id: "sdsdj",
      },
      members: [
        {
          name: "Player 1",
          age: 20,
          gender: "male",
          jerseyNumber: 1,
          id: "1",
          phoneNumber: "9841234567",
          position: "Goalkeeper",
          isCaptain: true,
          teamId: "1",
        },
        {
          name: "Player 2",
          age: 22,
          gender: "male",
          jerseyNumber: 7,
          id: "1",
          phoneNumber: "9841234567",
          position: "Forward",
          isCaptain: true,
          teamId: "62",
        },
      ],
    },
  ];
  // @ts-ignore
  const venue = event.geoLocation?.value?.description.split(",")[1] ?? "";
  return (
    <Box
      flex={1}
      sx={{
        border: "1px solid #ccc",
        display: "flex",
        flexDirection: "column",
        height: "78vh",
        position: "sticky",
        top: "40px",
        p: 1,
      }}
    >
      <img
        src={event.eventImage}
        alt="Event Image"
        style={{
          objectFit: "cover",
          borderRadius: "4px",
          height: "150px",
          width: "100%",
        }}
      />

      <Typography
        variant="h3"
        marginTop={3}
        lineHeight={0.5}
        textAlign="center"
      >
        {event.name}
      </Typography>
      <Typography variant="body1" lineHeight={1} textAlign="center">
        {event.createdBy?.name}
      </Typography>
      <Typography
        variant="caption"
        lineHeight={1}
        textAlign="center"
        mt={0.5}
        color={Color.text.main}
      >
        {venue}
      </Typography>
      <EventHighlights event={event} isDesc={true} />
      <Box
        paddingX={1}
        mt={2}
        sx={{
          height: "100%",
          overflow: "scroll",
        }}
      >
        <Typography variant="h6">Description</Typography>
        <Box
          sx={{
            maxHeight: "150px",
            overflow: "scroll",
          }}
        >
          <Typography
            variant="body1"
            lineHeight={1.2}
            fontSize={"12px"}
            fontWeight={400}
            textAlign="left"
            mt={1}
          >
            {event.description}
          </Typography>
        </Box>
        <Box marginTop={2}>
          <Typography variant="h6">Perks</Typography>
        </Box>
        <Box marginTop={2}>
          <Typography variant="h6" mb={1}>
            Registered Teams
          </Typography>
          <Box>
            {teams.length ? (
              teams.map((team, index) => (
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
                  onClick={() => console.log("team")}
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
          </Box>
        </Box>
      </Box>
    </Box>
  );
};