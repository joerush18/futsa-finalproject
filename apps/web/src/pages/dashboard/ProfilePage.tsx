import Image from "@/components/image/Image";
import useUserStore from "@/store/useUserStore";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { createRatingStars } from "core";
import Color from "@/utils/color";
import useModal from "@/hooks/useModal";
import { useUpdateFutsal } from "core";
import {
  IOnboardingState,
  createDefaultValues,
} from "../auth/onboarding/types";
import WhereToVoteIcon from "@mui/icons-material/WhereToVote";

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

const LabelName = ({ label, value }: { label: string; value: string }) => (
  <Box display="flex" alignItems="center" gap={1} mb={1}>
    <Typography variant="body2" fontWeight="bold">
      {label + ":"}
    </Typography>
    <Typography variant="body1">{value}</Typography>
  </Box>
);

interface ProfileEditModalProps {
  open: boolean;
  handleClose: () => void;
}

import { useForm } from "react-hook-form";
import { FormInputText } from "@/components/ui/InputBox";
import ImageUpload from "@/components/ui/ImageUpload";
import { useToastContext } from "@/store/ToastContext";
import SelectAmenities from "@/components/ui/tagsBox";
import LocationAutoComplete from "@/components/ui/LocationAutoComplete";

const ProfileEditModal = ({ open, handleClose }: ProfileEditModalProps) => {
  const { futsal, setFutsal } = useUserStore();
  const defaultValues: IOnboardingState = createDefaultValues(futsal);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { isDirty },
  } = useForm<IOnboardingState>({
    defaultValues: defaultValues,
  });

  const { mutate: updateFutsal, isLoading } = useUpdateFutsal();

  const { showToast } = useToastContext();

  const handleVerifications = (values: IOnboardingState) => {
    try {
      updateFutsal({ ...values });
      setFutsal({ ...values });
      showToast({
        type: "success",
        message: "Profile updated successfully",
      });
      handleClose();
    } catch (error) {
      showToast({
        type: "error",
        message: "Something went wrong",
      });
    }
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          bgcolor: "background.paper",
          width: "50%",
          borderRadius: "10px",
          padding: "20px",
          height: "80%",
          overflowY: "scroll",
        }}
      >
        <Typography variant="h6" component="h2">
          Edit your profile
        </Typography>
        <Typography id="modal-modal-description">
          Please enter your new information
        </Typography>
        <Box mt={4}>
          <form onSubmit={handleSubmit(handleVerifications)}>
            <Stack direction="row" gap={4}>
              <FormInputText
                name={"futsalName"}
                control={control}
                label={"Futsal Name"}
                type="text"
              />
              <FormInputText
                name={"email"}
                control={control}
                label={"Email"}
                type="email"
                props={{
                  disabled: true,
                }}
              />
            </Stack>
            <Stack direction="row" gap={4}>
              <FormInputText
                name={"address.city"}
                control={control}
                label={"City"}
                type="text"
              />
              <FormInputText
                name={"address.street"}
                control={control}
                label={"Street"}
                type="text"
              />
            </Stack>
            <Stack direction="row" gap={4}>
              <FormInputText
                name={"phonenumber"}
                control={control}
                label={"Phone number"}
                type="number"
              />
              <FormInputText
                name={"price"}
                control={control}
                label={"Price"}
                type="number"
              />
            </Stack>
            <Stack direction="row" gap={4}>
              <FormInputText
                name={"groundSize"}
                control={control}
                label={"Ground size"}
                type="number"
              />
              <FormInputText
                name={"openTime"}
                control={control}
                label={"Opening time"}
                type="time"
              />
              <FormInputText
                name={"closeTime"}
                control={control}
                label={"Closing time"}
                type="time"
              />
            </Stack>
            <LocationAutoComplete
              control={setValue}
              placeValue={futsal.geoLocation}
            />
            <SelectAmenities
              control={setValue}
              name="Amenities"
              value={futsal.Amenities}
            />
            <FormInputText
              name={"description"}
              control={control}
              label={"Description"}
              type="textArea"
              props={{
                multiline: true,
                rows: 4,
              }}
            />
            <Typography variant="body2" mb={2}>
              Upload Images
            </Typography>
            <Stack direction="row" gap={1}>
              <ImageUpload
                label="Avatar"
                name="profilePicture"
                control={setValue}
                defaultImage={futsal?.profilePicture}
              />
              <ImageUpload
                label="Cover "
                name="coverPicture"
                control={setValue}
                defaultImage={futsal?.coverPicture}
              />
            </Stack>
            <Button
              variant="contained"
              type="submit"
              disabled={isLoading || !isDirty}
              sx={{
                mt: 2,
              }}
            >
              {isLoading ? "Updating..." : "Update"}
            </Button>
          </form>
        </Box>
      </Box>
    </Modal>
  );
};
