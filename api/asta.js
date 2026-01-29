export default async function handler(req, res) {
  try {
    const id = req.query.id;
    if (!id) {
      return res.status(400).json({ error: "Parametro id mancante. Usa ?id=..." });
    }

    const upstreamUrl = `https://www.gestionale-aste.it/api/aste`;

    const r = await fetch(upstreamUrl, {
      headers: { "X-Api-Key": process.env.GESTIONALE_ASTE_API_KEY },
    });

    const data = await r.json();

    const found = Array.isArray(data?.aste)
      ? data.aste.find((x) => String(x.id) === String(id))
      : null;

    if (!found) {
      return res.status(404).json({ error: "Asta non trovata", id });
    }

    return res.status(200).json(found);
  } catch (e) {
    return res.status(500).json({ error: "Proxy error", details: String(e) });
  }
}
