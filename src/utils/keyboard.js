export function submitOnEnter(event, callback) {
  if (event.key !== "Enter") return;

  callback();
}
