import { fetchBooks } from "./fetchBooks.js";
import { addFavorite, removeFavorite, isFavorite } from "./favorites.js";
import { bookCard } from "./ui.js";

const grid = document.getElementById("bookGrid");
const status = document.getElementById("status");
const input = document.getElementById("searchInput");
const btn = document.getElementById("searchBtn");
let books = [];

async function load(query) {
  status.innerHTML = `<div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>`;
  grid.innerHTML = "";
  try {
    books = await fetchBooks(query);
    status.innerHTML = books.length ? "" : "No results found.";
    grid.innerHTML = books.map(bookCard).join("");
  } catch (err) {
    status.textContent = "Something went wrong. Please try again.";
  }
}

btn.addEventListener("click", () => input.value.trim() && load(input.value.trim()));
input.addEventListener("keydown", (e) => e.key === "Enter" && btn.click());

// Event delegation for favorite buttons
grid.addEventListener("click", (e) => {
  const btn = e.target.closest(".fav-btn");
  if (!btn) return;
  const book = books.find((b) => b.id === btn.dataset.id);
  isFavorite(book.id) ? removeFavorite(book.id) : addFavorite(book);
  grid.innerHTML = books.map(bookCard).join("");
});

load("javascript"); // default books on first load