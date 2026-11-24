// Your availability, shown in the hero status chip and used by ACE.
// Set it without touching code: NUXT_PUBLIC_AVAILABILITY in your host's
// environment settings (or .env locally), then redeploy.
//   'open'       → job hunting: "Open to new missions" (emerald, pulsing)
//   'on-mission' → employed:    "On mission" (amber, steady)
// Anything else falls back to 'open'.
export const normalizeAvailability = (value) =>
  String(value ?? '').trim().toLowerCase() === 'on-mission' ? 'on-mission' : 'open';
