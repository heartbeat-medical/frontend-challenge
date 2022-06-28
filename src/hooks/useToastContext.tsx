import { useContext} from "react";
import ToastContext from "../contexts/toastContext";

export default function useToastContext() {
  return useContext(ToastContext);
}
