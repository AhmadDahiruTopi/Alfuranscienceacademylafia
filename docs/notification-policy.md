# Alfurqan Science Academy Lafia Notification Policy

**Status: Draft — requires approval by the school administrator before browser push is activated.**

## Purpose

The school portal may display school announcements inside the authenticated notification center and may send optional browser push alerts to users who explicitly opt in. The notification service exists to help the academy communicate important academic, operational, and safeguarding updates without replacing direct school communication.

## Approved notification categories

Only these categories may be sent: published academy announcements; timetable, examination, result, attendance, or fee-status reminders relevant to the recipient; urgent operational or safeguarding notices; and account or security events affecting the recipient’s portal access. Notifications must be concise, factual, and relevant to the recipient’s role.

The system must not send advertising, unrelated third-party promotions, sensitive student scores in a lock-screen message, passwords, payment-card information, private health information, or monitoring recordings through push notifications. A notification should contain a short summary and direct the user into the authenticated portal for protected details.

## Consent and controls

Push permission is opt-in. The portal must not request browser permission on first page load. Users must start the action from a clearly labelled notification setting or subscription control, and they must be able to withdraw permission through the portal and their device/browser settings. Students and parents should receive only alerts intended for their own account or linked student. Staff should receive only role-relevant school alerts.

## Retention and security

The in-app notification center may retain published alerts according to the school’s existing announcement-retention practice. Push subscription endpoints and encryption keys are confidential account data and must be stored securely, never shown in exports, and removed when a user withdraws consent or an endpoint becomes invalid. Operational logs must not contain notification secrets or full protected message bodies.

## Approval checklist

Before activation, the administrator should confirm that this policy is accepted, identify the staff member responsible for notification content, confirm the retention period, and confirm the school’s support contact for mistaken or unwanted alerts. Until this checklist is confirmed, the service worker may safely render a received push payload but the application must not request permission, create subscriptions, or send school push alerts.
