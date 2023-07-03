import { FormInputText } from "@/components/ui/InputBox";
import Color from "@/utils/color";
import {
  Box,
  Button,
  Card,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { IOnboardingState, createDefaultValues } from "./types";
import useCurrentUser from "@/hooks/useCurrentUser";
import TagBox from "@/components/ui/tagsBox";
import ImageUpload from "@/components/ui/ImageUpload";

const OnBoardingClient = () => {
  const { futsal } = useCurrentUser();
  const defaultValues: IOnboardingState = createDefaultValues(futsal);
  console.log({ defaultValues });
  const { handleSubmit, control } = useForm<IOnboardingState>({
    defaultValues: defaultValues,
  });

  const handleVerifications = (values: IOnboardingState) => {
    console.log(values);
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
      <Box minWidth="70%" height="100vh" p={2}>
        <Card>
          <Box textAlign="center" mt={4}>
            <Typography variant="h4">Welcome to futsa</Typography>
            <Typography>
              Please enter all the required details below before proceeding to
              your futsal dashboard for verification.
            </Typography>
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
              <FormInputText
                name={"phonenumber"}
                control={control}
                label={"Phone number"}
                type="number"
              />

              <Stack direction="row" gap={4}>
                <FormInputText
                  name={"price"}
                  control={control}
                  label={"Price"}
                  type="number"
                />
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
              <TagBox />
              <Stack direction="row" gap={4}>
                <ImageUpload />
                <ImageUpload />
                <ImageUpload />
              </Stack>

              <Button
                variant="contained"
                type="submit"
                sx={{
                  marginTop: 2,
                }}
              >
                Submit
              </Button>
            </form>
          </Box>
        </Card>
      </Box>
    </Stack>
  );
};

export default OnBoardingClient;
