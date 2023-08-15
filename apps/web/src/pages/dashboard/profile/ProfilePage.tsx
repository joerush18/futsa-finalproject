import Image from "@/components/image/Image";
import useUserStore from "@/store/useUserStore";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { createRatingStars } from "core";
import Color from "@/utils/color";
import useModal from "@/hooks/useModal";
import WhereToVoteIcon from "@mui/icons-material/WhereToVote";
import { LabelName } from "./LabelName";
import { ProfileEditModal } from "./ProfileEditModal";

const ProfilePage = () => {
  const { futsal } = useUserStore();
  if (!futsal) {
    return (
      <Box
        sx={{
          display: "grid",
          placeItems: "center",
        }}
      >
        <Typography>Something went wrong.</Typography>
      </Box>
    );
  }
  const {
    open: openProfileEditModal,
    onClose: handleCloseProfileEditModal,
    onOpen: handleOpenProfileEditModal,
  } = useModal();
  return (
    <Box width="full" position="relative">
      <Image src={futsal.coverPicture ?? ""} height="300px" width="full" />
      <Card
        sx={{
          position: "absolute",
          width: "calc(100% - 64px)",
          top: "200px",
          left: "32px",
        }}
      >
        <CardContent>
          <Box display="flex" alignItems="center" gap={3}>
            <Avatar
              src={futsal.profilePicture ?? ""}
              sx={{ width: 70, height: 70 }}
            />
            <Box>
              <Typography variant="h5">{futsal.futsalName}</Typography>
              <Typography variant="body1">
                {futsal.address.city + " " + futsal.address.street}
              </Typography>
              <Typography variant="body1" color={Color.warning.main}>
                {createRatingStars(futsal.ratings)}
              </Typography>
            </Box>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mt={3}
          >
            <Typography variant="h6">Profile Information</Typography>
            <IconButton
              aria-label="open-modal-edit-profile"
              onClick={handleOpenProfileEditModal}
            >
              <EditIcon />
            </IconButton>
          </Box>
          <Typography variant="body1" mr={10}>
            {futsal.description}
          </Typography>
          <Box mt={2} display="flex" gap={10}>
            <Box>
              <LabelName label="Full Name" value={futsal.futsalName} />
              <LabelName label="Email" value={futsal.email} />
              <LabelName label="Phone" value={futsal.phonenumber.toString()} />
              <LabelName label="Location" value={futsal.address.city} />
            </Box>
            <Box>
              <LabelName
                label="Price"
                value={"Rs. " + futsal.price.toString()}
              />
              <LabelName label="Open Time" value={futsal.openTime} />
              <LabelName label="Close Time" value={futsal.closeTime} />
              <LabelName
                label="Ground Size"
                value={futsal.groundSize.toString() + "A Side"}
              />
            </Box>
          </Box>
          <LabelName
            label="Amenities"
            value={futsal.Amenities.map((amenity) => amenity).join(", ")}
          />
          {futsal.geoLocation?.lat ? (
            <Stack alignItems="flex-end" gap={1} flexDirection="row">
              <WhereToVoteIcon color="success" />
              <Typography variant="caption" fontWeight="bold" color="green">
                Geolocation enabled
              </Typography>
            </Stack>
          ) : null}
        </CardContent>
      </Card>
      <ProfileEditModal
        open={openProfileEditModal}
        handleClose={handleCloseProfileEditModal}
      />
    </Box>
  );
};

export default ProfilePage;

export interface ProfileEditModalProps {
  open: boolean;
  handleClose: () => void;
}
