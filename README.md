# Mery SEO Tools — Personal Micro-SaaS

A Next.js personal micro-SaaS that markets **tiered digital access with no free tier**. Users request an invoice by email, pay on an external store, then redeem a code to unlock progressively more in-browser tools stored in `localStorage`.

**Stack:** Next.js 14, Tailwind, SMTP (nodemailer), static configs — no database. Built for solo creators who need clear policies and a legitimate manual-review purchase story.

## Quick start

```bash
cp .env.example .env.local
# Fill SMTP_* and ADMIN_EMAIL
npm install
npm run dev
```

## Environment

```env
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
SMTP_FROM=creator@email.com
ADMIN_EMAIL=creator@email.com
```

## Access tokens (one per pass)

See [ACCESS_TOKENS.md](./ACCESS_TOKENS.md) for the full fulfillment table.

## Tier unlocks (paid only)

| Tier | Generators |
|------|------------|
| 0    | 0 (locked) |
| 1    | 2          |
| 2    | 4          |
| …    | +2/tier    |
| 7    | 14         |
| 8    | 15         |

## Pages

- `/` — Marketing + workspace
- `/pricing` — 8 Consulting Passes
- `/terms`, `/privacy-policy`, `/refund-policy`, `/dmca`

## Build

```bash
npm run build
npm start
```
