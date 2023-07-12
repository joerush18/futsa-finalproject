import { Alert, IconButton, Snackbar } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

import { useToastContext } from "@/store/ToastContext";
import "./Toast.css";

const Toast = () => {
  const { toastProps, showToast } = useToastContext();

  return (
    <Snackbar {...toastProps}>
      <Alert
        severity={toastProps.type}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            className="snackbar-Alert__IconButton"
            onClick={() => showToast({ open: false })}
          >
            <CloseIcon />
          </IconButton>
        }
      >
        {toastProps.message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
