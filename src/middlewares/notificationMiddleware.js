import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let loadingToastId = null;

const createLoadingToast = () => {
  loadingToastId = toast.loading("Loading...", {
    position: "top-center",
    closeOnClick: false,
    closeButton: false,
    autoClose: false,
    hideProgressBar: true,
    draggable: false,
    pauseOnHover: true,
    style: {
      width: "fit-content",
      fontWeight: "bold",
      margin: "auto",
    },
  });
  return loadingToastId;
};

const toastMiddleware = (store) => (next) => (action) => {
  if (action.type.startsWith("FETCH") || action.type.startsWith("PATCH")) {
    return next(action);
  }

  if (action.type.endsWith("_PENDING")) {
    if (!loadingToastId) {
      createLoadingToast();
    }
  }

  if (action.type.endsWith("_SUCCESS") || action.type.endsWith("_ERROR")) {
    if (loadingToastId) {
      toast.dismiss(loadingToastId);
      loadingToastId = null;
    }

    const message = action?.payload?.message
      ? action.payload.message
      : action.type.endsWith("_SUCCESS")
      ? "Success!"
      : "Action failed!";
    toast[action.type.endsWith("_SUCCESS") ? "success" : "error"](message, {
      position: "top-right",
      autoClose: 3000,
    });
  }

  return next(action);
};

export default toastMiddleware;
