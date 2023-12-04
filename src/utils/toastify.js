import { toast } from "react-toastify";

export const toastify = ({ message, type }) => {
  toast[type](message, {
    position: "bottom-center",
    autoClose: 500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: false,
    theme: "light",
  });
};
