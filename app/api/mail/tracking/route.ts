export async function POST(req: Request) {
  // Qui puoi registrare l'apertura dell'email (ad esempio, salvando in un database o log)
  console.log("Email aperta");
  // Invia il pixel (un'immagine 1x1 trasparente)
  const pixel = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/6Dqk9YAAAAASUVORK5CYII=",
    "base64"
  );

  return Response.json({ pixel }, { headers: { "Content-Type": "image/png" } });
}
