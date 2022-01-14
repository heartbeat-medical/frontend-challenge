// sleep, allows mocking slow network requests
// or other slow async processes
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
