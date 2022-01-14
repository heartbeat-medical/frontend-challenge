import { FunctionComponent } from "react";
import "./toast.css";
type props = {
  title: string;
  message?: string;
  status: "success" | "error";
};

export const ToastBox: FunctionComponent<props> = ({
  title,
  message,
  status,
}) => {
  return (
    <div className={["toast", status].join(" ")}>
      <h6>{title}</h6>
      {message && <p>{message}</p>}
    </div>
  );
};
