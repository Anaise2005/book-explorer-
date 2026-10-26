import { isFavorite } from "./favorites.js";

export function bookCard(book) {
  const fav = isFavorite(book.id);
  return `
    <article class="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col">
      <img src="${book.cover}" alt="Cover of ${book.title}" class="h-56 w-full object-cover rounded-lg mb-3" />
      <h3 class="font-semibold line-clamp-2">${book.title}</h3>
      <p class="text-sm text-gray-500">${book.author} · ${book.year}</p>
      <button data-id="${book.id}"
        class="fav-btn mt-auto pt-3 text-sm font-medium ${fav ? "text-red-600" : "text-indigo-700"}">
        ${fav ? "♥ Remove favorite" : "♡ Add to favorites"}
      </button>
    </article>`;
}