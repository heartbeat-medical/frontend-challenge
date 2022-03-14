import { ToastBox, ToastProps } from "./toast";

export default function ToastContainer({ toasts }: { toasts: ToastProps[] }) {
  return (
    <>
      {toasts &&
        toasts.map((toast) => (
          <ToastBox
            key={toast.id}
            id={toast.id}
            title={toast.title}
            message={toast.message}
            status={toast.status}
          />
        ))}
    </>
  );
}
