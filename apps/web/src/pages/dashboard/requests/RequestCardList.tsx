import { Box } from "@mui/material";
import { IRequest } from "core";
import { RequestCard } from "./RequestCard";
import { requests } from "./RequestPage";
import Color from "@/utils/color";

export const RequestCardList = ({
  onOpen,
  setSelected,
}: {
  onOpen: () => void;
  setSelected: React.Dispatch<React.SetStateAction<IRequest>>;
}) => {
  return (
    <Box
      sx={{
        border: `1px solid ${Color.grey[300]}`,
        borderRadius: "10px 10px 0 0",
        width: "100%",
      }}
    >
      {requests.map((request) => (
        <RequestCard
          request={request}
          key={request.id}
          onOpen={onOpen}
          setSelected={setSelected}
        />
      ))}
    </Box>
  );
};
