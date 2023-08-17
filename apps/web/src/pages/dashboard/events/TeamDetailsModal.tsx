import Color from "@/utils/color";
import { Avatar, Box, Button, Modal, Stack, Typography } from "@mui/material";
import { ITeam } from "core";
import Loading from "@/components/Loading";
import useMembers from "@/hooks/useMembers";

export const TeamDetailsModal = ({
  open,
  onClose,
  selectedTeam,
}: {
  open: boolean;
  onClose: () => void;
  selectedTeam?: ITeam;
}) => {
  if (!selectedTeam) return null;
  const { members, isLoading } = useMembers(selectedTeam?.id);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          bgcolor: "background.paper",
          borderRadius: "6px",
          paddingX: "50px",
          paddingBottom: "20px",
          maxHeight: "90%",
          maxWidth: "60%",
          overflowY: "scroll",
        }}
      >
        <Typography variant="h5" textAlign="center" my={3}>
          {selectedTeam?.name}
        </Typography>
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
        <Stack flexDirection="row" alignItems="center">
          <Button
            variant="contained"
            sx={{
              margin: "auto",
              mt: 8,
            }}
          >
            Approve
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};
