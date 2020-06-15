const dotenv = require('dotenv');

dotenv.config();

const fetch = require('cross-fetch');
const md5 = require('md5');
const isEmail = require('validator/lib/isEmail');

const { MAILCHIMP_API_KEY, MAILCHIMP_LIST_ID } = process.env;
const apiRegion = MAILCHIMP_API_KEY.split('-').pop();

const API_URL = `https://${apiRegion}.api.mailchimp.com/3.0/`;

function getAuthorization() {
  return `Basic ${Buffer.from(`user:${MAILCHIMP_API_KEY}`).toString('base64')}`;
}

async function makeRequest({ path, method, body }) {
  const response = await fetch(API_URL + path, {
    method,
    body: body ? JSON.stringify(body) : null,
    headers: {
      authorization: getAuthorization(),
    },
  });
  return response;
}

function generateMemberId(email) {
  if (!email) {
    return null;
  }
  return md5(email.toLowerCase());
}

async function getContactListStatus({ email, listId }) {
  const contactId = generateMemberId(email);
  const res = await makeRequest({
    method: 'GET',
    path: `lists/${listId}/members/${contactId}`,
  });
  if (res.status === 404) {
    return null;
  }
  if (res.status !== 200) {
    throw new Error('An error occured');
  }
  const data = await res.json();
  return data.status;
}

function mapDataFields(data = {}) {
  return {
    FNAME: data.firstname || '',
    LNAME: data.lastname || '',
    PHONE: data.phone || '',
  };
}

async function updateListMember({ email, listId, data }) {
  const memberId = generateMemberId(email);
  const response = await makeRequest({
    method: 'PUT',
    path: `lists/${listId}/members/${memberId}`,
    body: {
      email_address: email,
      status: 'subscribed',
      merge_fields: mapDataFields(data),
    },
  });
  return response.status === 200;
}

async function addListMember({ email, listId, data }) {
  const response = await makeRequest({
    method: 'POST',
    path: `lists/${listId}/members`,
    body: {
      email_address: email,
      status: 'subscribed',
      merge_fields: mapDataFields(data),
    },
  });
  return response.status === 200;
}

async function addListMemberHelper({ email, listId, data }) {
  const status = await getContactListStatus({ email, listId });

  if (status === 'bounced') {
    return false;
  }

  if (status) {
    // Update member
    return updateListMember({ email, listId, data });
  }

  // Create new member
  return addListMember({ email, listId, data });
}

exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);

    if (!data.email || !isEmail(data.email)) {
      return { statusCode: 400, body: '' };
    }

    await addListMemberHelper({ email: data.email, listId: MAILCHIMP_LIST_ID });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'ok' }),
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};
