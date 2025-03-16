export async function GET(req, { params }) {
  const { actionId } = req; // Ottieni l'actionId dal parametro dell'URL

  const data = await params;

  console.log("aaaa", data);

  // Log dell'azione
  console.log(`Received request for action: ${actionId}`);

  return new Response(JSON.stringify({ error: "Unknown action type" }), {
    status: 400,
  });
}
