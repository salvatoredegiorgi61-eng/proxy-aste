export default async function handler(req, res) {
  try {
    const { id } = req.query;

    // 1) Chiama l’endpoint LISTA
    const upstreamUrl = `https://www.gestionale-aste.it/api/aste`;

    const r = await fetch(upstreamUrl, {
      headers: {
        "X-Api-Key": process.env.GESTIONALE_ASTE_API_KEY,
      },
    });

    const data = await r.json();

    // 2) Trova l’asta con l’ID richiesto
    const found = Array.isArray(data?.aste)
      ? data.aste.find((x) => String(x.id) === String(id))
      : null;

    // 3) Se non la trova, 404
    if (!found) {
      return res.status(404).json({ error: "Asta non trovata", id });
    }

    // 4) Ritorna SOLO il dettaglio
    return res.status(200).json(found);
  } catch (e) {
    return res.status(500).json({ error: "Proxy error", details: String(e) });
  }
}
