import { Alert, Snackbar } from "@mui/material";
import type { NotificationOptions } from "../../contexts/notification/NotificationContext";

export interface NotificationProps {
  open: boolean;
  options?: NotificationOptions;
  handleClose: () => void;
}

export function Notification({
  handleClose,
  options,
  open,
}: Readonly<NotificationProps>) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={options?.type}
        variant="outlined"
        sx={{ width: "100%" }}
      >
        {options?.message}
      </Alert>
    </Snackbar>
  );
}
