import { IRequest, REQUEST_STATUS } from "core";

export const createRequestDefault = (req?: IRequest) => {
  const defaultRequest: IRequest = {
    title: req?.title ?? "",
    description: req?.description ?? "",
    startDate: req?.startDate ?? "",
    endDate: req?.endDate ?? "",
    location: req?.location ?? "",
    budget: req?.budget ?? "",
    deadline: req?.deadline ?? "",
    status: req?.status ?? REQUEST_STATUS.ACTIVE,
  };
  return defaultRequest;
};
