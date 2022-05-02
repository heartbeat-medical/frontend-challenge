import {
  createContext,
  useReducer,
  useContext,
  FunctionComponent,
} from "react";
import { ToastProps } from "./toast_container";

const ToastStateContext = createContext({ toasts: [] });
const ToastDispatchContext = createContext(null);

const ToastReducer = (
  state: { toasts: ToastProps[] },
  action: { type: string; toast: ToastProps; id: string }
) => {
  switch (action.type) {
    case "ADD_TOAST": {
      return {
        ...state,
        toasts: [...state.toasts, action.toast],
      };
    }
    case "DELETE_TOAST": {
      const updatedToasts = state.toasts.filter((e: any) => e.id !== action.id);
      return {
        ...state,
        toasts: updatedToasts,
      };
    }
    default: {
      throw new Error("unhandled action");
    }
  }
};

export const ToastProvider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(ToastReducer, {
    toasts: [],
  });

  return (
    <ToastStateContext.Provider value={state as any}>
      <ToastDispatchContext.Provider value={dispatch as any}>
        {children}
      </ToastDispatchContext.Provider>
    </ToastStateContext.Provider>
  );
};

export const useToastStateContext = () => useContext(ToastStateContext);
export const useToastDispatchContext = () => useContext(ToastDispatchContext);
