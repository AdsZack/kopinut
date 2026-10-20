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

export function initSidebarToggle() {
  const toggleButton = document.getElementById("sidebar-toggle");
  const categoryList = document.getElementById("category-list");

  toggleButton.addEventListener("click", () => {
    const isHidden = categoryList.classList.toggle("hidden");
    categoryList.classList.toggle("flex", !isHidden);
    toggleButton.setAttribute("aria-expanded", String(!isHidden));
  });
}

export function renderSidebar(active) {
  const button = document.querySelectorAll(
    "#category-list button[data-category]",
  );

  button.forEach((button) => {
    button.classList.toggle("font-bold", button.dataset.category === active);
  });
}
