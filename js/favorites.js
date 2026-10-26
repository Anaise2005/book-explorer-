/**
 * Favorites module: stores the user's favorite books in localStorage.
 * Exports: getFavorites, isFavorite, addFavorite, removeFavorite
 */

const KEY = "favorites";

export function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

export function isFavorite(id) {
  return getFavorites().some((b) => b.id === id);
}

export function addFavorite(book) {
  const favs = getFavorites();
  if (!favs.some((b) => b.id === book.id)) {
    favs.push(book);
    localStorage.setItem(KEY, JSON.stringify(favs));
  }
}

export function removeFavorite(id) {
  const favs = getFavorites().filter((b) => b.id !== id);
  localStorage.setItem(KEY, JSON.stringify(favs));
}