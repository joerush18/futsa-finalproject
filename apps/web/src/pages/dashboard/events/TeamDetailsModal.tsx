import Color from "@/utils/color";
import { Avatar, Box, Button, Modal, Stack, Typography } from "@mui/material";
import { ITeam, useEventStore, useUpdateEvent } from "core";
import Loading from "@/components/Loading";
import useMembers from "@/hooks/useMembers";
import { useParams } from "react-router-dom";

export const TeamDetailsModal = ({
  open,
  onClose,
  selectedTeam,
  teams,
}: {
  open: boolean;
  onClose: () => void;
  selectedTeam?: ITeam;
  teams: ITeam[];
}) => {
  if (!selectedTeam) return null;
  const { members, isLoading } = useMembers(selectedTeam?.id);
  const { id } = useParams();
  if (!id) return null;
  const { mutate: updateEvent, isLoading: isApproving } = useUpdateEvent();
  const { updateEvent: updateEventLocal } = useEventStore();

  const handleApproveTeam = (teams: ITeam[], id: string) => {
    updateEvent(
      {
        id: id,
        teams: teams.map((team) => {
          if (team.id === selectedTeam?.id) {
            return {
              ...team,
              verified: true,
            };
          }
          return team;
        }),
      },
      {
        onSuccess: () => {
          updateEventLocal({
            id: id,
            teams: teams.map((team) => {
              if (team.id === selectedTeam?.id) {
                return {
                  ...team,
                  verified: true,
                };
              }
              return team;
            }),
          });
          onClose();
        },
      }
    );
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          bgcolor: "background.paper",
          borderRadius: "6px",
          paddingBottom: "20px",
          maxHeight: "100%",
          maxWidth: "60%",
          overflowY: "scroll",
          px: 2,
        }}
      >
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
          mx={3}
        >
          <Typography variant="h5" my={3}>
            {selectedTeam?.name}
          </Typography>
          <Typography variant="h5" my={3}>
            {selectedTeam?.createdBy?.name}
          </Typography>
          {selectedTeam.verified ? (
            <Typography
              variant="caption"
              my={3}
              color="white"
              sx={{
                bgcolor: "green",
                px: 2,
                borderRadius: "4px",
                fontWeight: 600,
              }}
            >
              Verified
            </Typography>
          ) : (
            <Button
              variant="contained"
              onClick={() => handleApproveTeam(teams, id)}
            >
              {isApproving ? "Approving..." : "Approve"}
            </Button>
          )}
        </Stack>
        <Stack
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="center"
          gap={2}
        >
          {members?.length ? (
            members.map((member) => {
              if (!member) {
                return;
              }
              return (
                <Stack
                  key={member.id}
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    border: `1px solid ${Color.grey[300]}`,
                    p: 2,
                    bgcolor: Color.grey[100],
                    borderRadius: 2,
                    width: "200px",
                    position: "relative",
                    "&:hover": {
                      cursor: "pointer",
                      border: `1px solid ${Color.primary.main}}`,
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: Color.dark.focus,
                      height: "40px",
                      width: "40px",
                    }}
                  />
                  <Typography variant="h5" mt={1} fontWeight={600}>
                    {member.jerseyNumber}
                  </Typography>
                  <Typography variant="h6">{member.memberName}</Typography>
                  <Typography
                    variant="body1"
                    color={Color.grey[700]}
                    fontWeight={600}
                    fontSize={12}
                  >
                    {member.email}
                  </Typography>
                  <Typography
                    variant="body1"
                    color={Color.grey[700]}
                    fontWeight={400}
                  >
                    {member.phoneNumber}
                  </Typography>
                  <Typography
                    sx={{
                      position: "absolute",
                      top: "8px",
                      right: "10px",
                      borderRadius: "4px",
                      color: Color.text.main,
                      fontWeight: 600,
                    }}
                  >
                    {member.position}
                  </Typography>
                </Stack>
              );
            })
          ) : (
            <Typography>No members</Typography>
          )}
        </Stack>
      </Box>
    </Modal>
  );
};
