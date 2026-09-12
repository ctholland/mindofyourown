// netlify/functions/subscribe.js
//
// Adds or updates a contact in the "Mind Of Your Own® Newsletter" Mailchimp
// audience with status "subscribed" (single opt-in — no confirmation email).
//
// Required Netlify environment variables (set in the Netlify dashboard,
// never in code):
//   MAILCHIMP_API_KEY
//   MAILCHIMP_AUDIENCE_ID
//   MAILCHIMP_SERVER_PREFIX

const crypto = require('crypto');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SAFE_ERROR = 'Something went wrong. Please try again.';
const INVALID_EMAIL_ERROR = 'Please enter a valid email address.';

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return respond(405, { error: 'Method not allowed.' });
  }

  var email;
  try {
    var body = JSON.parse(event.body || '{}');
    email = String(body.email || '').trim().toLowerCase();
  } catch (parseErr) {
    return respond(400, { error: INVALID_EMAIL_ERROR });
  }

  if (!email || !EMAIL_REGEX.test(email) || email.length > 254) {
    return respond(400, { error: INVALID_EMAIL_ERROR });
  }

  var API_KEY = process.env.MAILCHIMP_API_KEY;
  var AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
  var SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX;

  if (!API_KEY || !AUDIENCE_ID || !SERVER_PREFIX) {
    console.error('subscribe: missing one or more Mailchimp environment variables.');
    return respond(500, { error: SAFE_ERROR });
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
      // Covers both "brand new" and "already subscribed" — Mailchimp's PUT
      // upsert returns 200 for both, so the frontend shows the same
      // "You're in" message either way, per spec.
      return respond(200, { success: true });
    }

    // Log full Mailchimp error server-side only. Never forward Mailchimp's
    // own error text to the browser.
    console.error('subscribe: Mailchimp error', mcResponse.status, data);
    return respond(400, { error: SAFE_ERROR });

  } catch (networkErr) {
    console.error('subscribe: request to Mailchimp failed', networkErr);
    return respond(500, { error: SAFE_ERROR });
  }
};

function respond(statusCode, jsonBody) {
  return {
    statusCode: statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(jsonBody)
  };
}
