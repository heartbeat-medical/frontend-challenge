import { ToastBox as Toast } from "./toast";
import { useToastStateContext } from "./toast_reducer";

export type ToastProps = {
  title: string;
  message?: string;
  type: "success" | "error";
  id: string;
};
export default function ToastContainer() {
  const { toasts } = useToastStateContext();

  return (
    <>
      {toasts &&
        toasts.map((toast: ToastProps) => (
          <Toast
            title={toast.title}
            key={toast.id}
            status={toast.type}
            message={toast.message}
          />
        ))}
    </>
  );
}
