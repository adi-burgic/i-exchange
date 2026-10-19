/* =========================================================
   Vercel serverless function:  /api/waitlist

   GET  /api/waitlist   -> { ok: true, count }
   POST /api/waitlist   body: { email, city, consent, website }
                        -> 201 { ok: true, status: 'joined', count }
                        -> 409 { ok: false, error: 'duplicate', count }
                        -> 400 { ok: false, error: 'invalid_email' | 'invalid_city' | 'consent_required' }

   Talks to Supabase through its REST API (PostgREST) with plain fetch,
   so there are no npm dependencies. The URL and secret key come ONLY
   from environment variables and never reach the browser.
   ========================================================= */

// Must match the <select> options in index.html.
const ALLOWED_CITIES = [
  'Ljubljana', 'Maribor', 'Celje', 'Kranj', 'Koper', 'Velenje', 'Novo mesto',
  'Ptuj', 'Murska Sobota', 'Nova Gorica', 'Domžale', 'Kamnik', 'Jesenice',
  'Škofja Loka', 'Other'
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Small helper so this works both on Vercel and in the plain Node dev server.
function sendJson(res, status, data) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(data));
}

// Vercel usually parses JSON bodies for us; handle a raw string just in case.
function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') {
    try { return JSON.parse(req.body); } catch (e) { return {}; }
  }
  return {};
}

module.exports = async function handler(req, res) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;

  if (!url || !key) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_KEY environment variable.');
    return sendJson(res, 500, { ok: false, error: 'server_config' });
  }

  const tableUrl = url.replace(/\/+$/, '') + '/rest/v1/waitlist';

  // New-style Supabase secret keys (sb_secret_...) go in the apikey header only;
  // legacy JWT service_role keys also need the Authorization header.
  const headers = { apikey: key, 'Content-Type': 'application/json' };
  if (!key.startsWith('sb_')) headers.Authorization = 'Bearer ' + key;

  // Ask Supabase for the row count only (HEAD request, no rows returned).
  async function getCount() {
    const r = await fetch(tableUrl + '?select=id', {
      method: 'HEAD',
      headers: Object.assign({}, headers, { Prefer: 'count=exact' })
    });
    if (!r.ok) throw new Error('Count failed with status ' + r.status);
    // Content-Range looks like "0-24/25" or "*/0" — the total is after the slash.
    const range = r.headers.get('content-range') || '';
    const total = parseInt(range.split('/')[1], 10);
    return Number.isFinite(total) ? total : 0;
  }

  try {
    /* ----- GET: just the count ----- */
    if (req.method === 'GET') {
      return sendJson(res, 200, { ok: true, count: await getCount() });
    }

    /* ----- POST: add a signup ----- */
    if (req.method === 'POST') {
      const body = readBody(req);

      // Honeypot: real people never see this field. If it's filled in, pretend
      // everything worked so the bot moves on, but don't save anything.
      if (body.website) {
        return sendJson(res, 201, { ok: true, status: 'joined', count: await getCount() });
      }

      const email = String(body.email || '').trim().toLowerCase();
      const city = String(body.city || '').trim();

      if (email.length > 254 || !EMAIL_RE.test(email)) {
        return sendJson(res, 400, { ok: false, error: 'invalid_email' });
      }
      if (!ALLOWED_CITIES.includes(city)) {
        return sendJson(res, 400, { ok: false, error: 'invalid_city' });
      }
      if (body.consent !== true) {
        return sendJson(res, 400, { ok: false, error: 'consent_required' });
      }

      const insert = await fetch(tableUrl, {
        method: 'POST',
        headers: Object.assign({}, headers, { Prefer: 'return=minimal' }),
        body: JSON.stringify({ email: email, city: city })
      });

      // 409 = the unique constraint on email was hit -> already on the list.
      if (insert.status === 409) {
        return sendJson(res, 409, { ok: false, error: 'duplicate', count: await getCount() });
      }
      if (!insert.ok) {
        const detail = await insert.text();
        throw new Error('Insert failed with status ' + insert.status + ': ' + detail);
      }

      return sendJson(res, 201, { ok: true, status: 'joined', count: await getCount() });
    }

    /* ----- Anything else ----- */
    res.setHeader('Allow', 'GET, POST');
    return sendJson(res, 405, { ok: false, error: 'method_not_allowed' });
  } catch (err) {
    console.error('[waitlist]', err);
    return sendJson(res, 500, { ok: false, error: 'server_error' });
  }
};
