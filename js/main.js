import { fetchBooks } from "./fetchBooks.js";
import { addFavorite, removeFavorite, isFavorite } from "./favorites.js";
import { bookCard } from "./ui.js";

const grid = document.getElementById("bookGrid");
const status = document.getElementById("status");
const input = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

let books = [];

// Draws the book cards from the books array
function renderBooks() {
  grid.innerHTML = books.map(bookCard).join("");
}

// Shows a spinner with the searched title while loading
function showLoading(query) {
  status.innerHTML = `
    <div class="flex flex-col items-center gap-2">
      <div class="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
      <p class="text-sm text-gray-500">Searching for "${query}"...</p>
    </div>`;
}

// Fetches books for a query and updates the page
async function load(query) {
  showLoading(query);
  grid.innerHTML = "";

  try {
    books = await fetchBooks(query);
    status.innerHTML = books.length
      ? `<p class="text-sm text-gray-500">Showing ${books.length} results for "${query}"</p>`
      : `<p class="text-lg text-gray-600">No results found for "${query}". Try another title.</p>`;
    renderBooks();
  } catch (error) {
    console.error(error);
    status.innerHTML = `<p class="text-red-600">Could not load books. Check your internet connection and try again.</p>`;
  }
}

// Runs a search when the user clicks Search or presses Enter
function handleSearch() {
  const query = input.value.trim();
  if (query) load(query);
}

searchBtn.addEventListener("click", handleSearch);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleSearch();
});

// Adds or removes a favorite when a card's button is clicked
grid.addEventListener("click", (e) => {
  const btn = e.target.closest(".fav-btn");
  if (!btn) return;

  const book = books.find((b) => b.id === btn.dataset.id);
  if (!book) return;

  if (isFavorite(book.id)) {
    removeFavorite(book.id);
  } else {
    addFavorite(book);
  }
  renderBooks();
});

// Show some books when the page first opens
load("javascript");