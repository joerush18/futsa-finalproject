import useUserStore from "@/store/useUserStore";
import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import { useUpdateFutsal } from "core";
import {
  IOnboardingState,
  createDefaultValues,
} from "../../auth/onboarding/types";
import { useForm } from "react-hook-form";
import { FormInputText } from "@/components/ui/InputBox";
import ImageUpload from "@/components/ui/ImageUpload";
import { useToastContext } from "@/store/ToastContext";
import SelectAmenities from "@/components/ui/tagsBox";
import LocationAutoComplete from "@/components/ui/LocationAutoComplete";
import { ProfileEditModalProps } from "./ProfilePage";

export const ProfileEditModal = ({
  open,
  handleClose,
}: ProfileEditModalProps) => {
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
