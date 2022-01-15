import { FunctionComponent, useEffect, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { IToast } from "../../models/ToastModel";
import "./ToastBox.css";

type props = {
  toast: IToast;
}

export const ToastBox: FunctionComponent<props> = ({
  toast
}) => {
  const [show, setShow] = useState(toast.message !== undefined);
  
  useEffect(() => setShow(toast.message !== undefined), [toast]);

  return (
   <>
   <ToastContainer position="bottom-center" className="p-3">
      <Toast className="d-inline-block m-1" onClose={() => setShow(false)} bg={toast.status} show={show} delay={3000} autohide>
        <Toast.Header closeButton={false}>
          <strong className="me-auto">{toast.title}</strong>
        </Toast.Header>
        <Toast.Body className="text-white">
          {toast.message}
        </Toast.Body>
      </Toast>
    </ToastContainer>
   </>
  );
};
