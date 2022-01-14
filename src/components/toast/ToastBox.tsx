import { FunctionComponent } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import "./ToastBox.css";

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
   <>
   <ToastContainer position="bottom-center" className="p-3">
      <Toast className="d-inline-block m-1" bg={status} delay={1000} autohide>
        <Toast.Header closeButton={false}>
          <strong className="me-auto">{title}</strong>
        </Toast.Header>
        <Toast.Body className="text-white">
          {message}
        </Toast.Body>
      </Toast>
    </ToastContainer>
   </>
  );
};
