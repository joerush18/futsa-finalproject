import Loading from "@/components/Loading";
import useEvent from "@/hooks/useEvents";
import Color from "@/utils/color";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";
import { EventCardGroup } from "./EventCardGroup";

const EventsPage = () => {
  const { selfEvent, othersEvent, isLoading } = useEvent();

  type eventstype = "My Events" | "Others";

  const [alignment, setAlignment] = useState<eventstype>("My Events");

  const handleAlignMent = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: eventstype
  ) => {
    event.preventDefault();
    setAlignment(newAlignment);
  };

  if (isLoading) {
    return <Loading />;
  }

  const buttons = ["My Events", "Others"].map((e, index) => (
    <ToggleButton
      key={index}
      value={e}
      sx={{
        textTransform: "capitalize",
      }}
    >
      {e}
    </ToggleButton>
  ));

  return (
    <>
      <ToggleButtonGroup
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
      </ToggleButtonGroup>
      <EventCardGroup
        events={alignment === "My Events" ? selfEvent : othersEvent}
      />
    </>
  );
};

export default EventsPage;
