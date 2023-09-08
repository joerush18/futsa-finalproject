import Loading from "@/components/Loading";
import useEvent from "@/hooks/useEvents";
import { Button, Typography } from "@mui/material";
import { EventCardGroup } from "./EventCardGroup";
import { useNavigate } from "react-router-dom";

const EventsPage = () => {
  const navigate = useNavigate();

  const { selfEvent, othersEvent, isLoading } = useEvent();

  // const [alignment] = useState<eventstype>("My Events");
  const alignment = "My Events";

  // const handleAlignMent = (
  //   event: React.MouseEvent<HTMLElement>,
  //   newAlignment: eventstype
  // ) => {
  //   event.preventDefault();
  //   setAlignment(newAlignment);
  // };

  // if (isLoading) {
  //   return <Loading />;
  // }

  // const buttons = ["My Events", "Others"].map((e, index) => (
  //   <ToggleButton
  //     key={index}
  //     value={e}
  //     sx={{
  //       textTransform: "capitalize",
  //     }}
  //   >
  //     {e}
  //   </ToggleButton>
  // ));
  if (isLoading) return <Loading />;

  return (
    <>
      {/* <ToggleButtonGroup
        color="primary"
        size="small"
        value={alignment}
        exclusive
        onChange={handleAlignMent}
        aria-label="Platform"
        sx={{
          bgcolor: Color.background.default,
          width: "100%",
          marginY: "10px",
          paddingBottom: "10px",
          position: "fixed",
          zIndex: 2,
          top: "70px",
          "& .MuiToggleButton-root": {
            fontWeight: "bold",
            textTransform: "capitalize",
            borderRadius: "10px",
            paddingX: "15px",
          },
        }}
      >
        {buttons}
      </ToggleButtonGroup> */}
      <Button
        variant="outlined"
        color="primary"
        sx={{
          textTransform: "capitalize",
          position: "fixed",
          zIndex: 2,
          right: "40px",
          top: "80px",
          borderRadius: 2,
        }}
        onClick={() => {
          navigate("/events/create");
        }}
      >
        Create event
      </Button>
      <Typography variant="h6" mb={2}>
        {alignment}
      </Typography>
      <EventCardGroup
        events={alignment === "My Events" ? selfEvent : othersEvent}
      />
    </>
  );
};

export default EventsPage;
