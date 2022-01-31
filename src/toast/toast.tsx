import { FunctionComponent } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type props = {
  title: string;
  status: "success" | "error" | "warning" | "info";
};
const customId = "error-toast";

export const ToastBox: FunctionComponent<props> = ({
  title,
  status,
}) => {
  const toastFn = status === "error" ? toast.error : toast.success;
  toastFn(title, { type: status, toastId: customId });
  return (
    <div>
      <ToastContainer />
    </div>
  );
};
