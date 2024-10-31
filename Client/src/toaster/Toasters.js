import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LeftToasterSuccess = (message) => {
  toast.success(message, {
    position: "top-left",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

const RightToasterSuccess = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

const LeftToasterWarning = (message) => {
  toast.warn(message, {
    position: "top-left",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

const RightToasterWarning = (message) => {
  toast.warn(message, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

const LeftToasterError = (message) => {
  toast.error(message, {
    position: "top-left",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

const RightToasterError = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export {
  LeftToasterSuccess,
  RightToasterSuccess,
  LeftToasterWarning,
  RightToasterWarning,
  LeftToasterError,
  RightToasterError,
};
