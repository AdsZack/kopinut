import "./style.css";
import { renderMenus } from "./menu.js";
import { initCheckout, addToCheckout } from "./checkout.js";
import { initSidebar, initSidebarToggle, renderSidebar } from "./sidebar.js";
import {
  getActiveCategory,
  getActiveSubCategory,
  getKeyword,
  getSubCategories,
  getVisibleMenus,
  isSearching,
} from "./filter.js";
import { initSubCategory, renderSubCategories } from "./subcategory.js";
import { toLabel } from "./format.js";
import { initSearch, renderSearch } from "./search.js";
import { initProfile } from "./profile.js";

const menuList = document.getElementById("menu-list");
const subCategoryList = document.getElementById("subcategory-list");
const categoryTitle = document.getElementById("category-title");

function render() {
  const searching = isSearching();
  categoryTitle.textContent = searching
    ? "Search"
    : toLabel(getActiveCategory());
  renderSearch(getKeyword());
  renderSidebar(searching ? null : getActiveCategory());
  if (searching) {
    subCategoryList.innerHTML = "";
  } else {
    renderSubCategories(
      subCategoryList,
      getSubCategories(),
      getActiveSubCategory(),
    );
  }
  renderMenus(menuList, getVisibleMenus(), addToCheckout);
}

initCheckout();
initSidebar(render);
initSidebarToggle();
initSubCategory(subCategoryList, render);
initSearch(render);
initProfile();
render();
