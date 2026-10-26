/**
 * Fetches books from the Open Library API by title.
 * Returns an array of { id, title, author, year, cover }.
 */

/**
 * Fetches books from the Open Library API by title.
 * @param {string} query - The title to search for.
 * @returns {Promise<Array<{id: string, title: string, author: string, year: (number|string), cover: string}>>}
 * @throws {Error} If the request fails.
 */

export async function fetchBooks(query = "javascript") {
  const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(query)}&limit=20`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch books");
  const data = await res.json();

  return data.docs.map((d) => ({
    id: d.key,
    title: d.title,
    author: d.author_name ? d.author_name[0] : "Unknown author",
    year: d.first_publish_year || "N/A",
    cover: d.cover_i
      ? `https://covers.openlibrary.org/b/id/${d.cover_i}-M.jpg`
      : "https://via.placeholder.com/200x300?text=No+Cover",
  }));
}