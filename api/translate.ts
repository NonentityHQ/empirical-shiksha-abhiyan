const ALLOWED_TARGETS = new Set(["hi", "gu", "mr", "bn", "te", "kn", "ta", "pa", "or", "ml", "ur"]);

type RequestLike = { method?: string; body?: unknown; headers?: Record<string, string | string[] | undefined> };
type ResponseLike = {
  setHeader: (name: string, value: string) => void;
  status: (code: number) => ResponseLike;
  json: (value: unknown) => void;
};

type TranslationResponse = { data?: { translations?: Array<{ translatedText?: string }> }; error?: { message?: string } };

const requestCounts = new Map<string, { count: number; resetAt: number }>();

export default async function handler(req: RequestLike, res: ResponseLike) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
  if (req.method === "GET") {
    res.status(200).json({ configured: Boolean(apiKey) });
    return;
  }
  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  if (!apiKey) {
    res.status(503).json({ error: "Translation is not configured. Set GOOGLE_TRANSLATE_API_KEY on the server." });
    return;
  }

  const headers = req.headers || {};
  const originValue = headers.origin;
  const hostValue = headers.host;
  const origin = Array.isArray(originValue) ? originValue[0] : originValue;
  const host = Array.isArray(hostValue) ? hostValue[0] : hostValue;
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) {
        res.status(403).json({ error: "Cross-origin translation requests are not allowed." });
        return;
      }
    } catch {
      res.status(403).json({ error: "Invalid request origin." });
      return;
    }
  }
  const forwardedFor = headers["x-forwarded-for"];
  const ip = (Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor)?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const prior = requestCounts.get(ip);
  const current = !prior || prior.resetAt <= now ? { count: 0, resetAt: now + 60_000 } : prior;
  current.count += 1;
  requestCounts.set(ip, current);
  if (current.count > 30) {
    res.status(429).json({ error: "Too many translation requests. Please retry in a minute." });
    return;
  }

  const body = (req.body && typeof req.body === "object" ? req.body : {}) as { texts?: unknown; target?: unknown };
  const target = typeof body.target === "string" ? body.target.toLowerCase() : "";
  const texts = Array.isArray(body.texts) ? body.texts : [];
  if (!ALLOWED_TARGETS.has(target)) {
    res.status(400).json({ error: "Unsupported target language" });
    return;
  }
  if (texts.length < 1 || texts.length > 45 || texts.some((value) => typeof value !== "string" || value.length > 5000)) {
    res.status(400).json({ error: "Send between 1 and 45 text strings, each no longer than 5,000 characters." });
    return;
  }
  const totalCharacters = (texts as string[]).reduce((sum, value) => sum + value.length, 0);
  if (totalCharacters > 12000) {
    res.status(400).json({ error: "Translation batch is too large." });
    return;
  }

  try {
    const upstream = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${encodeURIComponent(apiKey)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ q: texts, target, format: "text" }),
    });
    const result = await upstream.json() as TranslationResponse;
    if (!upstream.ok) {
      res.status(502).json({ error: result.error?.message || "Cloud Translation request failed." });
      return;
    }
    const translations = result.data?.translations?.map((item) => item.translatedText || "");
    if (!translations || translations.length !== texts.length) {
      res.status(502).json({ error: "Cloud Translation returned an incomplete response." });
      return;
    }
    res.status(200).json({ translations });
  } catch {
    res.status(502).json({ error: "Unable to reach Cloud Translation. Try again shortly." });
  }
}
