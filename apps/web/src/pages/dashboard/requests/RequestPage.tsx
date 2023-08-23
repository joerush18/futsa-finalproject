import { IRequest, REQUEST_STATUS } from "core";
import useModal from "@/hooks/useModal";
import { useState } from "react";
import { RequestDetailsDrawer } from "./RequestDetailsDrawer";
import { RequestCardList } from "./RequestCardList";

export const requests: IRequest[] = [
  {
    id: "a123",
    title: "I need to conduct a sport meeet.",
    budget: 1200,
    description:
      "The logo is going to be for a Grocery E-commerce app. I will need two logos. One normal Logo, and one application ICON. the app name is Jumla. I need the logo in a maximum of 36 hours.",
    startDate: new Date(),
    endDate: new Date(),
    status: REQUEST_STATUS.ACTIVE,
    deadline: new Date(),
    createdAt: +new Date(),
    createdBy: {
      id: "askldjasl",
      name: "Saroj Aryal",
      email: "saroj@gmail.com",
    },
    location: "Pokhara",
  },
  {
    id: "a124",
    title: "Futsal tournament for 5 days.",
    budget: 1200,
    description:
      "lorem ipsum dolor sit amet, consectetur adip lorem ipsum. The logo is going to be for a Grocery E-commerce app. I will need two logos. One normal Logo, and one application ICON. the app name is Jumla. I need the logo in a maximum of 36 hours.",
    startDate: new Date(),
    endDate: new Date(),
    status: REQUEST_STATUS.ACCEPTED,
    deadline: new Date(),
    createdAt: +new Date(),
    createdBy: {
      id: "askldjasl",
      name: "hello baby",
      email: "hello baby",
    },
    location: "Pokhara",
  },
];

const RequestPage = () => {
  const { open, onOpen, onClose } = useModal();
  const [selectedRequest, setSelected] = useState({} as IRequest);

  return (
    <>
      <RequestCardList onOpen={onOpen} setSelected={setSelected} />
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
