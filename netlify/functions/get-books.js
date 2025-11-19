const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

exports.handler = async function(event, context) {
  try {
    if (!SUPABASE_URL || !SUPABASE_KEY) {
      return { statusCode: 500, body: JSON.stringify({ error: "Missing SUPABASE_URL or SUPABASE_KEY env vars" }) };
    }

    const res = await fetch(`${SUPABASE_URL}/rest/v1/books?select=*`, {
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
      },
    });

    if (!res.ok) {
      const txt = await res.text();
      return { statusCode: res.status, body: JSON.stringify({ error: txt }) };
    }

    const books = await res.json();
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ books }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
