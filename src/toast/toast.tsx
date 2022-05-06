import { FunctionComponent, useEffect } from "react";
import "./toast.css";
import { useToast } from "./ToastProvider";

export type ToastProps = {
  id: number;
  title: string;
  message?: string;
  status: "success" | "error";
};

export const ToastBox: FunctionComponent<ToastProps> = ({
  id,
  title,
  message,
  status,
}) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [id, removeToast]);

  return (
    <div className={["toast", status].join(" ")}>
      <h6>{title}</h6>
      {message && <p>{message}</p>}
    </div>
  );
};
