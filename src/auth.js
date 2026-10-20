const STORAGE_KEY = "kopinut-user";

export function getUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function isLoggedIn() {
  return getUser() !== null;
}

export function login(name = "Cashier") {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ name }));
}

export function logout() {
  localStorage.removeItem(STORAGE_KEY);
}
