export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const to = searchParams.get("to");

  if (!to) {
    return Response.json({ error: "Missing currency" }, { status: 400 });
  }

  const res = await fetch(
    `https://hexarate.paikama.co/api/rates/PKR/${to}/latest`,
    { next: { revalidate: 3600 } } 
  );

  const data = await res.json();

  return Response.json({
    rate: data.data.mid,
  });
}
