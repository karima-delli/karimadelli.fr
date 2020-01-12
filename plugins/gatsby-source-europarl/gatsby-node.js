const fetch = require('cross-fetch');
const cheerio = require('cheerio');

function getCategory($parent) {
  const el = $parent.find('.ep-layout_category .ep_name');

  if (!(el && el.length)) {
    return '';
  }

  return el.text().trim();
}

function getDate($parent, lang) {
  const el = $parent.find('.ep-layout_date time');

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
  const el = $parent.find('.erpl-activity-title .ep_name');

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

function getUrl($parent) {
  const el = $parent.find('a');

  if (!(el && el.length)) {
    return '';
  }

  return el.attr('href').trim();
}

function getActivitiesFromPage(html, lang) {
  const $ = cheerio.load(html);

  const items = $('article.erpl-activity-item')
    .map((i, e) => {
      const $el = $(e);

      const url = getUrl($el);
      const title = getTitle($el);
      const date = getDate($el, lang);
      const category = getCategory($el);

      return {
        url,
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
