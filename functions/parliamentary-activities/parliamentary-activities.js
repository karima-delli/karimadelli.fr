const fetch = require('cross-fetch');
const cheerio = require('cheerio');

function getCategory($parent) {
  const el = $parent.find('.erpl_document-subtitle-documenttype');
  if (!(el && el.length)) {
    return '';
  }
  return el.text().trim();
}

function getDate($parent) {
  const el = $parent.find('.erpl_document-subtitle-fragment').eq(0);
  if (!(el && el.length)) {
    return '';
  }
  const date = el.text().trim();
  return date.replace(/-/g, '/');
}

function getTitle($parent) {
  const el = $parent.find('span.t-item');
  if (!(el && el.length)) {
    return '';
  }
  return el
    .contents()
    .filter(function isText() {
      return this.type === 'text';
    })
    .text()
    .trim();
}

function getLinkUrl(el) {
  if (!(el && el.length)) {
    return '';
  }
  const href = el.attr('href');
  if (!href) {
    return null;
  }
  return href.trim();
}

function getUrl($parent) {
  const el = $parent.find('a.t-y');
  return getLinkUrl(el);
}

function getDocUrls($parent) {
  return {
    pdf: getLinkUrl($parent.find('a.erpl_document-subtitle-pdf')),
    doc: getLinkUrl($parent.find('a.erpl_document-subtitle-doc')),
  };
}

function getActivitiesFromPage(html) {
  const $ = cheerio.load(html);

  const items = $('.erpl_meps-activities-list .erpl_document')
    .map((i, e) => {
      const $el = $(e);

      const url = getUrl($el);
      const docUrls = getDocUrls($el);
      const title = getTitle($el);
      const date = getDate($el);
      const category = getCategory($el);

      return {
        url,
        docUrls,
        title,
        date,
        category,
      };
    })
    .get();

  return items;
}

exports.handler = async () => {
  try {
    const response = await fetch(process.env.EUROPARL_PAGE_URL);
    const html = await response.text();
    const activities = getActivitiesFromPage(html);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':
          'Origin, X-Requested-With, Content-Type, Accept',
        'Cache-Control': 'public, s-maxage=1800',
      },
      body: JSON.stringify({
        activities,
      }),
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};
