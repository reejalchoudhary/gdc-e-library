
const API_BASE = import.meta.env.VITE_API_BASE || "";

export async function fetchBooks() {
  const res = await fetch(`${API_BASE}/api/books`);
  return res.json();
}

export async function addBook(payload) {
  const res = await fetch(`${API_BASE}/api/books`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return res.json();
}
export default { fetchBooks, addBook };
