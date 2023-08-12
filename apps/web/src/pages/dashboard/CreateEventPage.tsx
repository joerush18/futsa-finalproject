import ImageUpload from "@/components/ui/ImageUpload";
import { FormInputText } from "@/components/ui/InputBox";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { IEvents } from "core";
import { useForm } from "react-hook-form";

const CreateEventPage = () => {
  const defaultValues: IEvents = {} as IEvents;

  const {
    handleSubmit,
    control,
    setValue,
    formState: { isDirty },
  } = useForm<any>({
    defaultValues: defaultValues,
  });
  return (
    <Box>
      <Typography variant="h6">Create Event</Typography>
      <Typography variant="subtitle1">Enter details of you event.</Typography>
      <Card>
        <CardContent>
          <Typography variant="h6" marginBottom={2}>
            Basic information *
          </Typography>
          <Stack flexDirection="row" alignItems="center" gap={2}>
            <FormInputText
              name={"name"}
              control={control}
              label={"Event Name"}
            />
            <FormInputText
              name={"eventDate"}
              control={control}
              label={"Event date"}
              type="date"
            />
          </Stack>
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
          <ImageUpload
            label="Upload Event Image"
            name="eventImage"
            control={setValue}
            height="200px"
            width="100%"
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default CreateEventPage;
