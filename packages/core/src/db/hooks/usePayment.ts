import { useMutation } from "@tanstack/react-query";
import { initiatePayment } from "../methods";
import { IInitiatiatePayment } from "../../types";

const useCreatePayment = () => {
  return useMutation(
    ["create-payment"],
    (data: IInitiatiatePayment) => initiatePayment(data),
    {
      onSuccess: (data) => {
        return data;
      },
      onError: (data) => {
        console.log("Error while paying.");
      },
    }
  );
};

export { useCreatePayment };
