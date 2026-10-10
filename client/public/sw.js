const SHELL_CACHE = "alfurqan-shell-v2";
const STATIC_CACHE = "alfurqan-static-v2";
const APP_SHELL = ["/", "/manifest.webmanifest"];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(SHELL_CACHE)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => ![SHELL_CACHE, STATIC_CACHE].includes(key))
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", event => {
  if (event.data?.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/api/") || url.pathname.startsWith("/oauth") || url.pathname.startsWith("/__manus__")) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then(response => {
          const copy = response.clone();
          void caches.open(SHELL_CACHE).then(cache => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request).then(cached => cached || caches.match("/")))
    );
    return;
  }

  const cacheableAsset = ["script", "style", "image", "font", "manifest"].includes(request.destination);
  if (!cacheableAsset) return;

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        if (!response.ok) return response;
        const copy = response.clone();
        void caches.open(STATIC_CACHE).then(cache => cache.put(request, copy));
        return response;
      });
    })
  );
});

self.addEventListener("push", event => {
  let payload = { title: "Al-furqan Science Academy Lafia", body: "You have a new school update.", url: "/" };
  try { if (event.data) payload = { ...payload, ...event.data.json() }; } catch { /* Use the safe fallback for malformed payloads. */ }
  event.waitUntil(self.registration.showNotification(payload.title, {
    body: payload.body,
    icon: "/manus-storage/alfurqan-icon-192_426176e9.png",
    badge: "/manus-storage/alfurqan-icon-192_426176e9.png",
    data: { url: payload.url || "/" },
    tag: payload.tag || "alfurqan-school-update",
  }));
});

self.addEventListener("notificationclick", event => {
  event.notification.close();
  const targetUrl = new URL(event.notification.data?.url || "/", self.location.origin).href;
  event.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(clientList => {
    const existing = clientList.find(client => "focus" in client);
    if (existing) {
      void existing.navigate(targetUrl);
      return existing.focus();
    }
    return self.clients.openWindow(targetUrl);
  }));
});
