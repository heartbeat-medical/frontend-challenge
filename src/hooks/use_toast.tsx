import { useToastDispatchContext } from '../components/toast/toast_reducer';

export function useToast(delay: number) {
  const dispatch: any = useToastDispatchContext();

  function toast(message: string, type:string) {
    const id = Math.random().toString(36).substr(2, 9);
    dispatch({
      type: 'ADD_TOAST',
      toast: {
        type,
        message,
        id,
      },
    });

    setTimeout(() => {
      dispatch({ type: 'DELETE_TOAST', id });
    }, delay);
  }

  return toast;
}