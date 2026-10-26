import { fetchBooks } from "./fetchBooks.js";
import { addFavorite, removeFavorite, isFavorite } from "./favorites.js";
import { bookCard } from "./ui.js";

const grid = document.getElementById("bookGrid");
const status = document.getElementById("status");
const input = document.getElementById("searchInput");
const btn = document.getElementById("searchBtn");
let books = [];

async function load(query) {
  status.innerHTML = `
    <div class="flex flex-col items-center gap-2">
      <div class="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
      <p class="text-sm text-gray-500">Searching for "${query}"...</p>
    </div>`;
  grid.innerHTML = "";

  try {
    books = await fetchBooks(query);
    status.innerHTML = books.length
      ? `<p class="text-sm text-gray-500">Showing ${books.length} results for "${query}"</p>`
      : `<p class="text-lg text-gray-600">No results found for "${query}". Try another title.</p>`;
    grid.innerHTML = books.map(bookCard).join("");
  } catch (err) {
    status.innerHTML = `<p class="text-red-600">Could not load books. Check your internet connection and try again.</p>`;
  }
}