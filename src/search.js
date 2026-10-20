import { setKeyword } from "./filter.js";

function debounce(fn, delay = 250) {
  let timerId;
  return (...arg) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(...arg), delay);
  };
}

export function initSearch(onChange) {
  const input = document.getElementById("search-input");

  const handleInput = debounce(() => {
    setKeyword(input.value);
    onChange();
  }, 250);

  input.addEventListener("input", handleInput);
}

export function renderSearch(keyword) {
  const input = document.getElementById("search-input");
  if (input.value !== keyword) {
    input.value = keyword;
  }
}
