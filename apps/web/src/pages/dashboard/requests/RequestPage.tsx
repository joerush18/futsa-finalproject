import { IRequest } from "core";
import useModal from "@/hooks/useModal";
import { useState } from "react";
import { RequestDetailsDrawer } from "./RequestDetailsDrawer";
import { RequestCardList } from "./RequestCardList";
import Loading from "@/components/Loading";
import useRequests from "@/hooks/useRequests";
import { Typography } from "@mui/material";

const RequestPage = () => {
  const { open, onOpen, onClose } = useModal();
  const [selectedRequest, setSelected] = useState({} as IRequest);
  const { requests, isFetchingRequest } = useRequests();
  if (isFetchingRequest) {
    return <Loading />;
  }

  return (
    <>
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
