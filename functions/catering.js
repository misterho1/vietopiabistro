// Cloudflare Pages Function: POST /functions/catering
// Receives JSON from the catering lead form and the food-truck event request.
// Email delivery is stubbed — same setup as functions/contact.js.

export async function onRequestPost(context) {
  const { request, env } = context;

  let payload;
  try {
    payload = await request.json();
  } catch (err) {
    return json({ ok: false, error: 'Invalid request body.' }, 400);
  }

  const formType = (payload.form_type || 'catering').toString();
  const name = (payload.name || '').toString().trim();
  const email = (payload.email || '').toString().trim();

  if (!name) {
    return json({ ok: false, error: 'Please tell us your name.' }, 422);
  }
  if (!isValidEmail(email)) {
    return json({ ok: false, error: 'Please enter a valid email address.' }, 422);
  }

  // Route by form_type. Food-truck booking → West Jordan team inbox.
  // Catering leads → default catering inbox (override with CATERING_INBOX env var).
  var inbox;
  if (formType === 'food_truck_event') {
    inbox = env.FOOD_TRUCK_INBOX || 'vietopiawj@gmail.com';
  } else {
    inbox = env.CATERING_INBOX || env.INBOX_EMAIL || 'andrew@exclusiveut.com';
  }

  // TODO: wire MailChannels or Resend here. See functions/contact.js for the snippet.
  // The function is currently a stub — it returns success but does not yet
  // send the email. Wire MailChannels (one TXT DNS record + uncomment the
  // block in functions/contact.js) to actually deliver.

  return json({
    ok: true,
    message: 'Thanks. We received your request and will be in touch within one business day.',
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
