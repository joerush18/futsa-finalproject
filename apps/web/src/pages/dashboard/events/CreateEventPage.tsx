import ImageUpload from "@/components/ui/ImageUpload";
import { FormInputText } from "@/components/ui/InputBox";
import LocationAutoComplete from "@/components/ui/LocationAutoComplete";
import { SelectMenu } from "@/components/ui/SelectMenu";
import useCurrentUser from "@/hooks/useCurrentUser";
import {
  createEventDefaultValue,
  createIMetaDefaultValue,
} from "@/utils/createDefaults";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { EventSchema, IEntryMeta, IEvents, TOURNAMENT_TYPE } from "core";
import { useForm } from "react-hook-form";
import { useCreateEvent } from "core";
import { useNavigate } from "react-router-dom";

const CreateEventPage = () => {
  const { futsal } = useCurrentUser();
  const defaultValues: IEvents = createEventDefaultValue();
  const { mutate: createEvent, isLoading } = useCreateEvent();
  const {
    handleSubmit,
    control,
    setValue,
    formState: { isDirty, errors },
  } = useForm<IEvents>({
    defaultValues: defaultValues,
    resolver: zodResolver(EventSchema),
  });

  const navigate = useNavigate();

  const handleSubmitEvent = (values: IEvents) => {
    const meta: IEntryMeta = createIMetaDefaultValue(futsal);
    const _eventData = {
      ...values,
      ...meta,
    };
    createEvent(_eventData, {
      onSuccess: () => {
        toast.success("Event created successfully");
        navigate("/events");
      },
      onError: (error: any) => {
        toast.error(error.message);
      },
    });
  };

  const tournamentTypesOptions: {
    label: string;
    value: string;
  }[] = Object.values(TOURNAMENT_TYPE).map((type) => {
    return {
      label: type,
      value: type,
    };
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
          <Stack flexDirection="row" gap={2}>
            <FormInputText
              name={"name"}
              control={control}
              label={"Event name"}
            />
            <FormInputText
              name={"eventDate"}
              control={control}
              label={"Event date"}
              type="date"
            />
            <FormInputText
              name={"endDate"}
              control={control}
              label={"End date"}
              type="date"
            />
          </Stack>
          <Stack flexDirection="row" alignItems="flex-start" gap={2} mb={2}>
            <LocationAutoComplete
              control={setValue}
              placeValue={futsal.geoLocation}
              label="Venue"
            />
            <SelectMenu
              control={control}
              label="Tournament type"
              name="tournamentType"
              options={tournamentTypesOptions}
            />
          </Stack>
          <Stack flexDirection="row" gap={2}>
            <Box
              sx={{
                width: "100%",
              }}
            >
              <FormInputText
                name={"description"}
                control={control}
                label={"Description"}
                type="textArea"
                props={{
                  multiline: true,
                  rows: 5,
                }}
              />
            </Box>
            <Box
              sx={{
                width: "100%",
                mt: "3px",
              }}
            >
              <ImageUpload
                label="Upload Event Image"
                name="eventImage"
                control={setValue}
                height="130px"
                width="100%"
                error={errors.eventImage?.message}
              />
            </Box>
          </Stack>
        </CardContent>
      </Card>
      <Card
        sx={{
          marginTop: 2,
        }}
      >
        <CardContent>
          <Typography variant="h6" marginBottom={2}>
            Other details *
          </Typography>
          <Stack flexDirection="row" gap={2}>
            <FormInputText
              name={"entryFee"}
              control={control}
              label={"Entry fee"}
              type="number"
            />
            <FormInputText
              name={"gameTime"}
              control={control}
              label={"Game time"}
              type="number"
            />
            <FormInputText
              name={"numberOfPlayers"}
              control={control}
              label={"No of players"}
              type="number"
            />
          </Stack>
        </CardContent>
      </Card>
      <Box
        sx={{
          marginY: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          disabled={!isDirty}
          variant="contained"
          sx={{
            minWidth: "200px",
          }}
          onClick={handleSubmit(handleSubmitEvent)}
        >
          {isLoading ? "Creating..." : "Create"}
        </Button>
      </Box>
    </Box>
  );
};

export default CreateEventPage;
