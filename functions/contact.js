// Cloudflare Pages Function: POST /functions/contact
// Receives JSON from the contact and newsletter forms, validates, returns JSON.
// Email delivery is stubbed. Wire MailChannels (free, no key required from Cloudflare-hosted Workers)
// or Resend (needs RESEND_API_KEY env var) when ready to actually send.

export async function onRequestPost(context) {
  const { request, env } = context;

  let payload;
  try {
    payload = await request.json();
  } catch (err) {
    return json({ ok: false, error: 'Invalid request body.' }, 400);
  }

  const formType = (payload.form_type || 'contact').toString();
  const email = (payload.email || '').toString().trim();
  const name = (payload.name || '').toString().trim();
  const subject = (payload.subject || '').toString().trim();
  const message = (payload.message || '').toString().trim();

  if (!isValidEmail(email)) {
    return json({ ok: false, error: 'Please enter a valid email address.' }, 422);
  }

  if (formType === 'contact' && (!name || !message)) {
    return json({ ok: false, error: 'Name and message are required.' }, 422);
  }

  const inbox = env.INBOX_EMAIL || 'andrew@exclusiveut.com';

  // TODO: send the email. Pick one of the providers below and remove this stub.
  //
  // Option A — MailChannels (no API key needed when sending from Cloudflare Workers/Pages):
  //   await fetch('https://api.mailchannels.net/tx/v1/send', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       personalizations: [{ to: [{ email: inbox }] }],
  //       from: { email: 'noreply@vietopiabistro.com', name: 'Vietopia Bistro' },
  //       subject: `[${formType}] ${subject || name || email}`,
  //       content: [{ type: 'text/plain', value: renderBody(payload) }]
  //     })
  //   });
  //
  // Option B — Resend (set RESEND_API_KEY in Pages env vars):
  //   await fetch('https://api.resend.com/emails', {
  //     method: 'POST',
  //     headers: {
  //       'Authorization': `Bearer ${env.RESEND_API_KEY}`,
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       from: 'Vietopia Bistro <noreply@vietopiabistro.com>',
  //       to: inbox,
  //       subject: `[${formType}] ${subject || name || email}`,
  //       text: renderBody(payload)
  //     })
  //   });

  return json({
    ok: true,
    message: 'Thanks. We received your message and will be in touch.',
    formType
  });
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}

// eslint-disable-next-line no-unused-vars
function renderBody(payload) {
  return Object.keys(payload)
    .map((k) => `${k}: ${payload[k]}`)
    .join('\n');
}
