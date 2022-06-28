import { FunctionComponent } from "react";
import "./toast.css";

export type ToastProps = {
  title: string;
  message?: string;
  status: "success" | "error";
};

export const ToastBox: FunctionComponent<ToastProps> = ({
  title,
  message,
  status,
}) => {
  return (
    <div data-testid="toast" className={["toast", status].join(" ")}>
      <h6>{title}</h6>
      {message && <p>{message}</p>}
    </div>
  );
};
