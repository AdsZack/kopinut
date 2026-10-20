import { setSubCategory } from "./filter.js";
import { toLabel } from "./format.js";

function createButton(value, label, isActive) {
  const activeClass = "bg-black text-white p-1 rounded-md min-w-20";
  const normalClass = "px-2 py-1 rounded-md w-auto shadow";
  return `
        <button 
            type="button" data-subcategory="${value}"
            class="${isActive ? activeClass : normalClass}">
            ${label}
        </button>
    `;
}

export function renderSubCategories(container, subCategories, active) {
  container.innerHTML =
    createButton("all", "All", active === "all") +
    subCategories
      .map((sub) => createButton(sub, toLabel(sub), active === sub))
      .join("");
}

export function initSubCategory(container, onChange) {
  container.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-subcategory]");
    if (!button) return;

    setSubCategory(button.dataset.subcategory);
    onChange();
  });
}
