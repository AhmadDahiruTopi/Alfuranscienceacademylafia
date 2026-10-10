import type { Express, Request, Response } from "express";
import { ENV } from "./env";

async function serveStoredImage(req: Request, res: Response) {
  const key = (req.params as Record<string, string>)[0];
  if (!key) {
    res.status(400).send("Missing storage key");
    return;
  }
  if (!ENV.forgeApiUrl || !ENV.forgeApiKey) {
    res.status(500).send("Storage proxy not configured");
    return;
  }
  try {
    const forgeUrl = new URL(
      "v1/storage/presign/get",
      ENV.forgeApiUrl.replace(/\/+$/, "") + "/",
    );
    forgeUrl.searchParams.set("path", key);
    const forgeResp = await fetch(forgeUrl, {
      headers: { Authorization: `Bearer ${ENV.forgeApiKey}` },
    });
    if (!forgeResp.ok) {
      const body = await forgeResp.text().catch(() => "");
      console.error(`[StorageProxy] forge error: ${forgeResp.status} ${body}`);
      res.status(502).send("Storage backend error");
      return;
    }
    const { url } = (await forgeResp.json()) as { url: string };
    if (!url) {
      res.status(502).send("Empty signed URL from backend");
      return;
    }
    const imageResp = await fetch(url);
    if (!imageResp.ok) {
      const body = await imageResp.text().catch(() => "");
      console.error(`[StorageProxy] image error: ${imageResp.status} ${body}`);
      res.status(502).send("Stored image could not be loaded");
      return;
    }
    const contentType = imageResp.headers.get("content-type") || "application/octet-stream";
    const contentLength = imageResp.headers.get("content-length");
    res.set("Cache-Control", "no-store");
    res.set("Content-Type", contentType);
    res.set("Access-Control-Allow-Origin", "*");
    if (contentLength) res.set("Content-Length", contentLength);
    res.send(Buffer.from(await imageResp.arrayBuffer()));
  } catch (err) {
    console.error("[StorageProxy] failed:", err);
    res.status(502).send("Storage proxy error");
  }
}

export function registerStorageProxy(app: Express) {
  // Keep the framework route for existing records, and expose a separate
  // route for portrait rendering so stale redirect caches cannot interfere.
  app.get("/manus-storage/*", serveStoredImage);
  app.get("/photo-assets/*", serveStoredImage);
}
