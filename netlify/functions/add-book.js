const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

exports.handler = async function(event, context) {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
    }
    if (!SUPABASE_URL || !SUPABASE_KEY) {
      return { statusCode: 500, body: JSON.stringify({ error: "Missing SUPABASE_URL or SUPABASE_KEY env vars" }) };
    }

    const payload = JSON.parse(event.body || "{}");

    // Basic validation
    if (!payload.title || !payload.author) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing title or author" }) };
    }

    const res = await fetch(`${SUPABASE_URL}/rest/v1/books`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=representation"
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (!res.ok) {
      return { statusCode: res.status, body: JSON.stringify({ error: data }) };
    }

    return {
      statusCode: 201,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ book: data[0] }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
