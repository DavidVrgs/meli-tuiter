import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type JSX,
} from "react";
import { Notification } from "../../components";
import type { AlertColor } from "@mui/material";

export type NotificationOptions = {
  message?: string;
  type?: AlertColor;
};

type NotificationContextType = {
  createNotification: (options: NotificationOptions) => void;
  handleClose: () => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<NotificationOptions>();

  const createNotification = useCallback((options: NotificationOptions) => {
    setOpen(true);
    setOptions(options);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const contextValue = useMemo(
    () => ({
      createNotification,
      handleClose,
    }),
    [createNotification, handleClose]
  );

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      <Notification open={open} options={options} handleClose={handleClose} />
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context)
    throw new Error(
      "useNotification must be used within an NotificationProvider"
    );
  return context;
};
