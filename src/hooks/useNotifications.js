import { useCallback, useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MAX_TOASTS = 3;

const defaultOptions = {
  position: "top-right",
  closeOnClick: false,
  closeButton: false,
  hideProgressBar: false,
  draggable: false,
  pauseOnHover: true,
  autoClose: 3000,
};

const useToast = () => {
  const [toastCount, setToastCount] = useState(0);

  useEffect(() => {
    const handleDismiss = () => {
      setToastCount((prevCount) => Math.max(prevCount - 1, 0));
    };

    toast.onChange(({ status }) => {
      if (status === "removed") {
        handleDismiss();
      }
    });
  }, []);

  const sendMsg = useCallback(
    (message, type) => {
      if (toastCount < MAX_TOASTS) {
        setToastCount((prevCount) => prevCount + 1);
        const toastOptions = {
          ...defaultOptions,
          onClose: () =>
            setToastCount((prevCount) => Math.max(prevCount - 1, 0)),
        };

        switch (type) {
          case "success":
            toast.success(message, toastOptions);
            break;
          case "error":
            toast.error(message, toastOptions);
            break;
          case "warning":
            toast.warning(message, toastOptions);
            break;
          case "info":
            toast.info(message, toastOptions);
            break;
          default:
            toast(message, toastOptions);
            break;
        }
      }
    },
    [toastCount]
  );

  return {
    sendMsgSuccess: (message) => sendMsg(message, "success"),
    sendMsgError: (message) => sendMsg(message, "error"),
    sendMsgWarning: (message) => sendMsg(message, "warning"),
    sendMsgInfo: (message) => sendMsg(message, "info"),
    sendMsgDefault: (message) => sendMsg(message, "default"),
  };
};

export default useToast;
