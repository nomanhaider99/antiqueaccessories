export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const to = searchParams.get("to");

    if (!to) {
      return Response.json({ error: "Missing currency" }, { status: 400 });
    }

    const API_KEY = process.env.EXCHANGE_RATE_API_KEY;

    if (!API_KEY) {
      console.error("Missing EXCHANGE_RATE_API_KEY");
      return Response.json({ error: "Server configuration error" }, { status: 500 });
    }

    const res = await fetch(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/PKR`,
      { cache: "no-store" } // ✅ never cache rates
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("Currency API failed:", res.status, text);
      return Response.json({ error: "Currency service unavailable" }, { status: 502 });
    }

    const data = await res.json();
    const rate = data?.conversion_rates?.[to];

    if (typeof rate !== "number") {
      console.error("Invalid rate payload:", data);
      return Response.json({ error: "Invalid rate data" }, { status: 502 });
    }

    return Response.json({ rate });
  } catch (err) {
    console.error("Exchange API error:", err);
    return Response.json({ error: "Unexpected server error" }, { status: 500 });
  }
}
