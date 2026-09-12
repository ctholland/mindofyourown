// netlify/functions/subscribe.js
//
// Adds or updates a contact in the "Mind Of Your Own® Newsletter" Mailchimp
// audience with status "subscribed" (single opt-in — no confirmation email).
//
// Live at: https://mindofyourown.com/.netlify/functions/subscribe
//
// Required Netlify environment variables (Site configuration > Environment
// variables in the Netlify dashboard — never in code):
//   MAILCHIMP_API_KEY
//   MAILCHIMP_AUDIENCE_ID
//   MAILCHIMP_SERVER_PREFIX

const crypto = require('crypto');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SAFE_ERROR = 'Something went wrong. Please try again.';
const INVALID_EMAIL_ERROR = 'Please enter a valid email address.';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

exports.handler = async function (event) {
  // Preflight — harmless to support even though same-origin POSTs won't need it.
  if (event.httpMethod === 'OPTIONS') {
    return respond(204, null);
  }

  if (event.httpMethod !== 'POST') {
    return respond(405, { error: 'Method not allowed.', code: 'METHOD_NOT_ALLOWED' });
  }

  var email;
  try {
    var body = JSON.parse(event.body || '{}');
    email = String(body.email || '').trim().toLowerCase();
  } catch (parseErr) {
    return respond(400, { error: INVALID_EMAIL_ERROR, code: 'BAD_REQUEST' });
  }

  if (!email || !EMAIL_REGEX.test(email) || email.length > 254) {
    return respond(400, { error: INVALID_EMAIL_ERROR, code: 'INVALID_EMAIL' });
  }

  var API_KEY = process.env.MAILCHIMP_API_KEY;
  var AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
  var SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX;

  if (!API_KEY || !AUDIENCE_ID || !SERVER_PREFIX) {
    // Visible only in Netlify's function logs, never in the response.
    console.error('subscribe: missing one or more Mailchimp environment variables.', {
      hasKey: !!API_KEY, hasAudience: !!AUDIENCE_ID, hasPrefix: !!SERVER_PREFIX
    });
    return respond(500, { error: SAFE_ERROR, code: 'CONFIG_MISSING' });
  }

  var subscriberHash = crypto.createHash('md5').update(email).digest('hex');
  var url = 'https://' + SERVER_PREFIX + '.api.mailchimp.com/3.0/lists/' + AUDIENCE_ID + '/members/' + subscriberHash;
  var auth = Buffer.from('anystring:' + API_KEY).toString('base64');

  try {
    var mcResponse = await fetch(url, {
      method: 'PUT', // upsert: creates if new, updates if existing — idempotent
      headers: {
        'Authorization': 'Basic ' + auth,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email_address: email,
        status_if_new: 'subscribed', // new contact -> subscribed immediately, single opt-in
        status: 'subscribed'          // existing contact -> ensure subscribed
      })
    });

    var data = await mcResponse.json().catch(function () { return {}; });

    if (mcResponse.ok) {
      // Mailchimp's PUT upsert returns 200 for both "brand new" and
      // "already subscribed" — so this single branch covers both, and the
      // frontend shows the same "You're in" message either way, per spec.
      return respond(200, { success: true });
    }

    // Full Mailchimp error detail goes to Netlify's function log ONLY —
    // never forwarded to the browser. This is what to check in Netlify ->
    // Functions -> subscribe -> logs if submissions keep failing.
    console.error('subscribe: Mailchimp rejected the request', {
      status: mcResponse.status,
      title: data && data.title,
      detail: data && data.detail
    });
    return respond(400, { error: SAFE_ERROR, code: 'MAILCHIMP_REJECTED' });

  } catch (networkErr) {
    console.error('subscribe: request to Mailchimp failed', networkErr && networkErr.message);
    return respond(500, { error: SAFE_ERROR, code: 'NETWORK_ERROR' });
  }
};

function respond(statusCode, jsonBody) {
  return {
    statusCode: statusCode,
    headers: Object.assign({ 'Content-Type': 'application/json' }, CORS_HEADERS),
    body: jsonBody === null ? '' : JSON.stringify(jsonBody)
  };
}
