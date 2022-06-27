export function debounce(func: any, duration:number): any {
  let timeout: any;

  return function (...args: []) {
    const effect = () => {
      timeout = null;
      return func.apply(typeof effect, args);
    }

    clearTimeout(timeout);
    timeout = setTimeout(effect, duration);
  }
}
