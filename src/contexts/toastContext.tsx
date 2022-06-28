import React, { useCallback, useEffect, useState, createContext } from "react";
import { ToastBox, ToastProps } from "../components/toast/toast";
const ToastContext = createContext({
  addToast: ({ title, message, status }: ToastProps) => {}
});

export default ToastContext;

export function ToastContextProvider({ children }: { children: JSX.Element }) {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  useEffect(() => {
    if(toasts.length > 0) {
      const timer = setTimeout(
        () => setToasts(toasts => toasts.slice(1)),
        3000
      );
      return () => clearInterval(timer);
    }
  }, [toasts]);

  const addToast = useCallback(
    ({title, message, status}) => {
      console.log('fwefew');
      setToasts((toasts) => [...toasts, {title, message, status}]);
    },
    [setToasts]
  );

  return (
    <ToastContext.Provider value={{addToast}}>
      {children}
      {toasts.map(toast => (
        <ToastBox
          title={toast.title}
          message={toast.message}
          status={toast.status}
        />
      ))}
    </ToastContext.Provider>
  )
}