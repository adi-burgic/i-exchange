# i-Exchange — landing page

> **No money, no problem.** A Slovenian marketplace for swapping items, with tokens to balance any difference in value.

This repo contains the pre-launch landing page and the waitlist.

- **Frontend:** plain HTML, CSS and JavaScript. No frameworks and no build step.
- **Backend:** one Vercel serverless function (`/api/waitlist`) that saves signups to Supabase and returns the waitlist count.
- **Languages:** English and Slovenian, switchable in the header. The choice is saved in `localStorage`.
- **Theme:** light by default, follows the system setting, has a dark mode toggle, and remembers the choice.

---

## Files

```
index.html        The page: all 13 sections, an SVG icon sprite, data-i18n hooks
styles.css        Styles: theme colours as CSS variables, mobile-first layout
script.js         Translations (EN/SL), language and theme toggles, listings, waitlist form
api/waitlist.js   Vercel function: GET = count, POST = join the waitlist
supabase.sql      SQL that creates the waitlist table with Row Level Security
dev-server.js     Tiny local server for testing (not used on Vercel)
favicon.svg       Tab icon
.env.example      Template for your secrets. Copy it to .env
.gitignore        Keeps .env out of git
.vercelignore     Keeps docs and dev-only files out of the deployment
```

## How the pieces connect

```
Browser (index.html + script.js)
   │  GET  /api/waitlist            → { count }
   │  POST /api/waitlist {email,…}  → { ok } or { error: 'duplicate' }
   ▼
Vercel function (api/waitlist.js)   ← reads SUPABASE_URL + SUPABASE_SERVICE_KEY from env vars
   │  HTTPS calls to the Supabase REST API, using the secret key
   ▼
Supabase Postgres: table public.waitlist (RLS on, no public access)
```

- The browser never talks to Supabase directly and never sees a key.
- The function checks every request again: valid email, a city from the allowed list, consent ticked, and an empty honeypot field. If the honeypot field is filled in, the function returns a fake success and saves nothing.
- A duplicate email triggers the table's `unique` constraint. The function returns `409 duplicate` and the page shows "You're already on the list". Emails are lower-cased first, so `Ana@X.si` and `ana@x.si` count as the same address.
- Every response includes the current `count`, so the "X people are already on the waitlist" line updates right after someone joins.

## 1. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor → New query**, paste the contents of [`supabase.sql`](supabase.sql) and click **Run**.
3. Open **Project Settings → API Keys** (or **API**) and copy:
   - the **Project URL** → `SUPABASE_URL`
   - the **secret** key (`sb_secret_…`) or, on older projects, the **service_role** key → `SUPABASE_SERVICE_KEY`

> Do not use the `anon` / publishable key. RLS blocks it on purpose.

## 2. Run it locally

You need Node.js **20.6 or newer** (for `--env-file`).

```bash
cp .env.example .env        # then paste your two values into .env
npm run local               # same as: node --env-file=.env dev-server.js
```

Open http://localhost:3000 and test:

| What to try | Expected |
|---|---|
| Page loads | The count line appears in the waitlist box once at least 1 person has signed up |
| Submit with a bad email / no city / box unticked | A friendly error, and the field is outlined in red |
| Submit a valid signup | "You're on the list!" and the count goes up by 1 |
| Submit the same email again | "You're already on the list — we'll be in touch soon!" |
| Click EN / SL, then reload | The language stays as you set it |
| Click the moon/sun, then reload | The theme stays as you set it |

Check the saved rows in Supabase under **Table Editor → waitlist**.

**Alternative:** if you use the Vercel CLI, `vercel dev` also works. It reads `.env` and runs the function the same way production does.

You can also test the API directly:

```bash
curl http://localhost:3000/api/waitlist
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","city":"Ljubljana","consent":true}'
```

## 3. Deploy to Vercel

1. Push the repo to GitHub. `.env` is git-ignored, so it won't be uploaded.
2. In Vercel, click **Add New → Project**, import the repo and set Framework Preset to **Other**. Leave the build settings empty.
3. Under **Settings → Environment Variables**, add `SUPABASE_URL` and `SUPABASE_SERVICE_KEY`.
4. Deploy. The page is served from the root and the function from `/api/waitlist`.

## Editing content

- **Text:** every string is in the `translations` object at the top of `script.js` (`en` and `sl`). HTML elements point to a key with `data-i18n="key"`. All text is inserted with `textContent`, so it is always rendered safely.
- **Plurals:** keys ending in `.one / .two / .few / .other` are plural forms. Slovenian has four (1 oseba, 2 osebi, 3 osebe, 5 oseb), and `Intl.PluralRules` picks the right one.
- **Example listings:** the `LISTINGS` array in `script.js`.
- **Cities:** the `<select>` in `index.html` **and** `ALLOWED_CITIES` in `api/waitlist.js`. Keep the two lists in sync.
- **Colours:** the CSS variables at the top of `styles.css`. `:root` holds the light theme and `[data-theme="dark"]` the dark one.

## Notes

- Honeypot spam protection is basic. If bots become a problem, add rate limiting (for example Vercel Firewall rules) or a CAPTCHA.
- Under GDPR, people can ask to have their data deleted. To delete someone, remove their row in Supabase's Table Editor.
