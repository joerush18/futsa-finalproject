import { IRequest } from "core";
import useModal from "@/hooks/useModal";
import { useState } from "react";
import { RequestDetailsDrawer } from "./RequestDetailsDrawer";
import { RequestCardList } from "./RequestCardList";
import Loading from "@/components/Loading";
import useRequests from "@/hooks/useRequests";
import { Chip, CircularProgress, Typography } from "@mui/material";
import { Refresh } from "@mui/icons-material";

const RequestPage = () => {
  const { open, onOpen, onClose } = useModal();
  const [selectedRequest, setSelected] = useState({} as IRequest);
  const { requests, isFetchingRequest, refetch } = useRequests();
  if (isFetchingRequest) {
    return <Loading />;
  }

  return (
    <>
      <Chip
        label="Refresh"
        onClick={() => refetch()}
        icon={isFetchingRequest ? <CircularProgress size={20} /> : <Refresh />}
        variant="outlined"
        sx={{
          mb: 1,
        }}
      />
      {requests && requests.length ? (
        <RequestCardList
          onOpen={onOpen}
          setSelected={setSelected}
          requests={requests}
        />
      ) : (
        <Typography variant="h6">No requests found</Typography>
      )}
      <RequestDetailsDrawer
        key={`${selectedRequest.id}_request_details`}
        onClose={onClose}
        open={open}
        request={selectedRequest}
      />
    </>
  );
};

export default RequestPage;
