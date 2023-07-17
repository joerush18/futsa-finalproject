import { FormInputText } from "@/components/ui/InputBox";
import Color from "@/utils/color";
import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
// import TagBox from "@/components/ui/tagsBox";
import ImageUpload from "@/components/ui/ImageUpload";
import { IOnboardingState, createDefaultValues } from "./types";
import { useForm } from "react-hook-form";
import { useUpdateFutsal } from "core/src/db/hooks/useFutsal";
import { STATUS } from "core/src/types/futsals.types";
import LogoutIcon from "@mui/icons-material/Logout";
import { useLogout } from "core/src/db/hooks/useAuth";
import useUserStore from "@/store/useUserStore";
import SelectAmenities from "@/components/ui/tagsBox";

const OnBoardingClient = () => {
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

  const {
    mutate: updateFutsal,
    isSuccess,
    isLoading,
    isError,
  } = useUpdateFutsal();

  const { mutate: logout, isLoading: isLogoutLoading } = useLogout();

  const handleVerifications = (values: IOnboardingState) => {
    updateFutsal({ ...values, status: STATUS.INACTIVE });
    setFutsal({ ...values, status: STATUS.INACTIVE });
    if (isSuccess) {
      console.log("success");
    }
    if (isError) {
      console.log("error");
    }
  };

  return (
    <Stack
      direction="row"
      justifyItems="left"
      bgcolor={Color.background.default}
      sx={{
        display: "grid",
        placeItems: "center",
      }}
    >
      <Box minWidth="70%" p={2}>
        <Card>
          <Box textAlign="center" mt={4}>
            <Typography variant="h4">Welcome to futsa</Typography>
            <Typography px={6} mb={2}>
              Please enter all the required details below before proceeding to
              your futsal dashboard for verification.
            </Typography>
            <Chip
              avatar={
                <Avatar alt="Natacha" src={futsal.profilePicture ?? ""} />
              }
              label={isLogoutLoading ? "Logging out..." : "Logout"}
              variant="outlined"
              onDelete={logout}
              deleteIcon={<LogoutIcon />}
            />
          </Box>
          {/* Details form */}
          <Box m={6}>
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
              <Typography variant="body2" mt={2} mb={1}>
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
                <ImageUpload
                  label="Verification"
                  name={"verificationPicture"}
                  control={setValue}
                  defaultImage={futsal?.verificationPicture}
                />
              </Stack>
              {futsal.status === STATUS.INACTIVE ? (
                <Box
                  bgcolor={Color.background.default}
                  px={2}
                  py={1}
                  my={2}
                  borderRadius={4}
                >
                  <Typography variant="body1" color={Color.primary.main}>
                    Thank you for joining. We are reviewing your request. You
                    can make changes and update the details.
                  </Typography>
                </Box>
              ) : null}

              <Button
                variant="contained"
                type="submit"
                disabled={isLoading || !isDirty}
                sx={{
                  mt: 2,
                }}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </Box>
        </Card>
      </Box>
    </Stack>
  );
};

export default OnBoardingClient;
