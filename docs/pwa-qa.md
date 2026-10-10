# PWA verification notes

The Alfurqan portal was rendered at a desktop viewport of 1280×720 and an Android-sized mobile viewport of 375×812. The dashboard remains readable, the mobile navigation opens through the menu control, the branded splash assets remain part of the startup path, and the topbar bell remains available at the mobile breakpoint.

The production build emitted the app shell, `manifest.webmanifest`, and `sw.js`. The service worker now version-busts old caches, excludes authenticated API/debug traffic, handles update handoff, and contains the safe push-notification display/click handlers.

A physical Android device was not available in this sandbox, so the native home-screen install prompt, manufacturer-specific splash rendering, and Android notification permission sheet were not directly exercised. The custom Install app control is intentionally exposed only when the browser fires `beforeinstallprompt` in a production secure context; a development preview may therefore hide that control. Final device acceptance should be performed on an HTTPS Android browser after the school approves the notification policy.
