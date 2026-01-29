export default async function handler(req, res) {
  try {
    const { id } = req.query;
    const upstreamUrl = `https://www.gestionale-aste.it/api/aste/${encodeURIComponent(id)}`;

    const r = await fetch(upstreamUrl, {
      headers: {
        "X-Api-Key": process.env.GESTIONALE_ASTE_API_KEY
      }
    });

    const data = await r.json();
    res.status(r.status).json(data);
  } catch (e) {
    res.status(500).json({
      error: "Proxy error",
      details: String(e)
    });
  }
}
