import { setCategory } from "./filter.js";

export function initSidebar(onChange) {
  const categoryList = document.getElementById("category-list");

  categoryList.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-category]");
    if (!button) return;

    setCategory(button.dataset.category);
    onChange();
  });
}
