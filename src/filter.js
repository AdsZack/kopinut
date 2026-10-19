import { menus } from "./data/menus.js";

const filters = { category: "coffee", subCategory: "all", keyword: "" };

export function setCategory(category) {
  filters.category = category;
  filters.subCategory = "all";
}

export function setSubCategory(subCategory) {
  filters.subCategory = subCategory;
}

export function getActiveSubCategory() {
  return filters.subCategory;
}

export function getSubCategories() {
  const inCategory = menus.filter((menu) => menu.category === filters.category);
  return [...new Set(inCategory.map((menu) => menu.subCategory))];
}

export function getVisibleMenus() {
  return menus.filter((menu) => {
    const matchCategory = menu.category === filters.category;
    const matchSub =
      filters.subCategory === "all" || menu.subCategory === filters.subCategory;
    return matchCategory && matchSub;
  });
}
