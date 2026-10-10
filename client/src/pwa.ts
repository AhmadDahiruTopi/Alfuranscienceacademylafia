type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

type PwaSnapshot = {
  installAvailable: boolean;
  installed: boolean;
  updateAvailable: boolean;
  supported: boolean;
};

const listeners = new Set<() => void>();
let deferredInstallPrompt: BeforeInstallPromptEvent | null = null;
let serviceWorkerRegistration: ServiceWorkerRegistration | null = null;
let snapshot: PwaSnapshot = {
  installAvailable: false,
  installed: false,
  updateAvailable: false,
  supported: typeof window !== "undefined" && "serviceWorker" in navigator,
};

const isStandalone = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(display-mode: standalone)").matches || Boolean((window.navigator as Navigator & { standalone?: boolean }).standalone);
};

const notify = () => listeners.forEach(listener => listener());
const updateSnapshot = (next: Partial<PwaSnapshot>) => {
  snapshot = { ...snapshot, ...next };
  notify();
};

export function getPwaSnapshot() {
  return snapshot;
}

export function subscribePwa(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export async function promptPwaInstall() {
  if (!deferredInstallPrompt) return false;
  const prompt = deferredInstallPrompt;
  deferredInstallPrompt = null;
  updateSnapshot({ installAvailable: false });
  await prompt.prompt();
  const choice = await prompt.userChoice;
  updateSnapshot({ installed: choice.outcome === "accepted" || isStandalone() });
  return choice.outcome === "accepted";
}

export function applyPwaUpdate() {
  if (serviceWorkerRegistration?.waiting) {
    serviceWorkerRegistration.waiting.postMessage({ type: "SKIP_WAITING" });
    return;
  }
  if (typeof window !== "undefined") window.location.reload();
}

export function registerPwaServiceWorker() {
  if (typeof window === "undefined" || !import.meta.env.PROD || !("serviceWorker" in navigator)) return;

  const hadController = Boolean(navigator.serviceWorker.controller);
  let reloadedForUpdate = false;
  updateSnapshot({ supported: true, installed: isStandalone() });

  window.addEventListener("beforeinstallprompt", event => {
    event.preventDefault();
    deferredInstallPrompt = event as BeforeInstallPromptEvent;
    updateSnapshot({ installAvailable: true, installed: isStandalone() });
  });
  window.addEventListener("appinstalled", () => {
    deferredInstallPrompt = null;
    updateSnapshot({ installAvailable: false, installed: true });
  });

  window.addEventListener("load", () => {
    void navigator.serviceWorker.register("/sw.js", { scope: "/" }).then(registration => {
      serviceWorkerRegistration = registration;
      registration.update().catch(() => undefined);
      registration.addEventListener("updatefound", () => {
        const installing = registration.installing;
        if (!installing) return;
        installing.addEventListener("statechange", () => {
          if (installing.state === "installed" && navigator.serviceWorker.controller) {
            updateSnapshot({ updateAvailable: true });
          }
        });
      });
      if (registration.waiting) updateSnapshot({ updateAvailable: true });
    }).catch(error => {
      console.warn("[PWA] Service worker registration failed", error);
    });
  }, { once: true });

  navigator.serviceWorker.addEventListener("controllerchange", () => {
    updateSnapshot({ updateAvailable: true });
    if (hadController && !reloadedForUpdate) {
      reloadedForUpdate = true;
      window.location.reload();
    }
  });
}
