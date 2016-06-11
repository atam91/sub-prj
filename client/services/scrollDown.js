export function scrollDown(id) {
  const element = document.getElementById(id);
  element.scrollTop = element.scrollHeight;
}