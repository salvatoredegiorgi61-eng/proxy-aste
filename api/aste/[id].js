export default async function handler(req, res) {
  try {
    const qs = new URLSearchParams(req.query).toString();
    const upstreamUrl = `https://www.gestionale-aste.it/api/aste${qs ? `?${qs}` : ""}`;

    const r = await fetch(upstreamUrl, {
      headers: { "X-Api-Key": process.env.GESTIONALE_ASTE_API_KEY },
    });

    const data = await r.json();
    res.status(r.status).json(data);
  } catch (e) {
    res.status(500).json({ error: "Proxy error", details: String(e) });
  }
}
