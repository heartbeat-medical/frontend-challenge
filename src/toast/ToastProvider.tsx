import React, { useState, useContext, useCallback } from "react";
import { ToastProps } from "./toast";
import ToastContainer from "./ToastContainer";

const ToastContext = React.createContext({
  addToast: ({ title, message, status }: Omit<ToastProps, "id">) => {},
  removeToast: (id: number) => {},
});

let id = 1;

const ToastProvider = ({ children }: { children: JSX.Element }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = useCallback(
    ({ title, message, status }) => {
      setToasts((toasts) => [
        ...toasts,
        {
          id: id++,
          title: title,
          message: message,
          status: status,
        },
      ]);
    },
    [setToasts]
  );

  const removeToast = useCallback(
    (id) => {
      setToasts((toasts) => toasts.filter((t) => t.id !== id));
    },
    [setToasts]
  );

  return (
    <ToastContext.Provider
      value={{
        addToast,
        removeToast,
      }}
    >
      <ToastContainer toasts={toasts} />
      {children}
    </ToastContext.Provider>
  );
};

const useToast = () => {
  const toastHelpers = useContext(ToastContext);
  return toastHelpers;
};

export { ToastContext, useToast };
export default ToastProvider;
