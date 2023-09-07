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
import {
  EventSchema,
  IEntryMeta,
  IEvents,
  TOURNAMENT_TYPE,
  useEventStore,
  useUpdateEvent,
} from "core";
import { useForm } from "react-hook-form";
import { useCreateEvent } from "core";
import { useNavigate, useSearchParams } from "react-router-dom";
import useEvent from "@/hooks/useEvents";
import Loading from "@/components/Loading";

const CreateEventPage = () => {
  const { isLoading: isFetching } = useEvent();
  const { futsal } = useCurrentUser();
  const { events, setEvents, updateEvent: updateEventLocal } = useEventStore();
  const [searchParams] = useSearchParams();
  const edit = searchParams.get("edit");
  const eventId = searchParams.get("id");

  if (!eventId && edit) {
    return <Typography>Event not found</Typography>;
  }

  const event = events.find((event) => event.id === eventId);

  const defaultValues: IEvents = edit
    ? createEventDefaultValue(event)
    : createEventDefaultValue();
  const { mutate: createEvent, isLoading } = useCreateEvent();
  const { mutate: updateEvent, isLoading: isUpdatingEvent } = useUpdateEvent();
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
        setEvents([_eventData, ...events]);
        navigate("/events");
      },
      onError: (error: any) => {
        toast.error(error.message);
      },
    });
  };

  const handleUpdateEvent = (values: IEvents) => {
    const updatedData: Partial<IEvents> & Pick<IEvents, "id"> = {
      ...values,
      id: eventId ?? "",
      updatedAt: +new Date(),
    };
    updateEvent(updatedData, {
      onSuccess: () => {
        toast.success("Event updated successfully");
        updateEventLocal(updatedData);
        navigate("/events");
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

  if (isFetching) {
    return <Loading label="Fetching" />;
  }
  return (
    <Box>
      <Typography variant="h6">
        {edit ? "Edit your event" : "Create new event"}
      </Typography>
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
                defaultImage={event?.eventImage}
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
          onClick={handleSubmit(edit ? handleUpdateEvent : handleSubmitEvent)}
        >
          {edit ? "Update" : isLoading || isUpdatingEvent ? "Wait" : "Create"}
        </Button>
      </Box>
    </Box>
  );
};

export default CreateEventPage;
