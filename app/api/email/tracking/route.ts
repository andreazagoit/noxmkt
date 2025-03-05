export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("uid");
  const campaignId = searchParams.get("cid");

  // Logga i dati della richiesta
  const headers = Object.fromEntries(req.headers.entries());
  console.log("Email aperta", {
    ip: headers["x-forwarded-for"] || "IP non disponibile",
    userAgent: headers["user-agent"],
    referer: headers["referer"],
    userId,
    campaignId,
  });

  // Crea il pixel 1x1 trasparente
  const pixel = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/6Dqk9YAAAAASUVORK5CYII=",
    "base64"
  );

  return new Response(pixel, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });
}
