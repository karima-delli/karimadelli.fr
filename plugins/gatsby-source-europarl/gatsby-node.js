const fetch = require('cross-fetch');
const cheerio = require('cheerio');

function getCategory($parent) {
  const el = $parent.find('.erpl_document-subtitle-documenttype');
  if (!(el && el.length)) {
    return '';
  }
  return el.text().trim();
}

function getDate($parent, lang) {
  const el = $parent.find('.erpl_document-subtitle-fragment').eq(0);
  if (!(el && el.length)) {
    return '';
  }
  const date = el.text().trim();
  if (lang === 'fr') {
    return date.replace(/-/g, '/');
  }
  const sp = date.split('-');
  return `${sp[1]}/${sp[0]}/${sp[2]}`;
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

function getActivitiesFromPage(html, lang) {
  const $ = cheerio.load(html);

  const items = $('.erpl_meps-activities-list .erpl_document')
    .map((i, e) => {
      const $el = $(e);

      const url = getUrl($el);
      const docUrls = getDocUrls($el);
      const title = getTitle($el);
      const date = getDate($el, lang);
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

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions;

  await Promise.all(
    ['fr', 'en'].map(async lang => {
      const url = `https://www.europarl.europa.eu/meps/${lang}/96868/KARIMA_DELLI/home`;

      const response = await fetch(url);
      const html = await response.text();
      const activities = getActivitiesFromPage(html, lang);

      const nodeData = {
        url,
        lang,
        activities,
      };

      createNode({
        ...nodeData,
        id: createNodeId(lang),
        parent: null,
        children: [],
        internal: {
          type: 'ParliamentaryActivities',
          contentDigest: createContentDigest(JSON.stringify(nodeData)),
        },
      });
    })
  );
};
