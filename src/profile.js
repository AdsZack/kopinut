import { getUser, isLoggedIn, login, logout } from "./auth.js";

export function renderProfile() {
  const nameElement = document.getElementById("profile-name");
  const actionButton = document.getElementById("auth-action");
  const user = getUser();

  nameElement.textContent = user ? user.name : "Guest";
  actionButton.textContent = user ? "Logout" : "Login";
}

export function initProfile() {
  const toggleButton = document.getElementById("profile-toggle");
  const menu = document.getElementById("profile-menu");
  const actionButton = document.getElementById("auth-action");

  function setOpen(open) {
    menu.classList.toggle("hidden", !open);
    toggleButton.setAttribute("aria-expanded", String(open));
  }

  toggleButton.addEventListener("click", () => {
    setOpen(menu.classList.contains("hidden"));
  });

  actionButton.addEventListener("click", () => {
    if (isLoggedIn()) {
      logout();
    } else {
      login();
    }

    renderProfile();
    setOpen(false);
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest("#profile-menu, #profile-toggle")) {
      setOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setOpen(false);
    }
  });

  renderProfile();
}
