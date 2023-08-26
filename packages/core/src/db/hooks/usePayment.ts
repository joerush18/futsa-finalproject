import { useMutation } from "@tanstack/react-query";
import { initiatePayment } from "../methods";
import { IInitiatiatePayment } from "../../types";

const useCreatePayment = () => {
  return useMutation(["create-payment"], (data: IInitiatiatePayment) =>
    initiatePayment(data)
  );
};

export { useCreatePayment };
