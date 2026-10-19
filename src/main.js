import "./style.css";
import { renderMenus } from "./menu.js";
import { initCheckout, addToCheckout } from "./checkout.js";
import { initSidebar } from "./sidebar.js";
import {
  getActiveSubCategory,
  getSubCategories,
  getVisibleMenus,
} from "./filter.js";
import { initSubCategory, renderSubCategories } from "./subcategory.js";

const menuList = document.getElementById("menu-list");
const subCategoryList = document.getElementById("subcategory-list");

function render() {
  renderSubCategories(
    subCategoryList,
    getSubCategories(),
    getActiveSubCategory(),
  );
  renderMenus(menuList, getVisibleMenus(), addToCheckout);
}

initCheckout();
initSidebar(render);
initSubCategory(subCategoryList, render);
render();
