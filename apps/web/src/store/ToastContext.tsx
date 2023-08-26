import { AlertColor, SnackbarProps } from "@mui/material";
import { createContext, useContext, useState } from "react";

type ToastProps = SnackbarProps & {
  type?: AlertColor;
};

type ToastContextProps = {
  showToast: (props: ToastProps) => void;
  toastProps: ToastProps;
};

const ToastContext = createContext<ToastContextProps>({
  showToast: () => {
    return;
  },
  toastProps: {},
});

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toastProps, setToastProps] = useState<ToastProps>({});

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    event.preventDefault();
    if (reason === "clickaway") {
      return;
    }

    setToastProps((prev) => ({ ...prev, open: false }));
  };

  const showToastHandler = (props: ToastProps) => {
    setToastProps({
      ...toastProps,
      autoHideDuration: 4000,
      open: true,
      onClose: handleClose,
      type: props.type ?? "info",
      ...props,
    });
  };

  return (
    <ToastContext.Provider value={{ showToast: showToastHandler, toastProps }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToastContext = (): ToastContextProps =>
  useContext(ToastContext);

export { ToastContext, ToastProvider };
