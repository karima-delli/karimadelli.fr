const path = require('path');

const DEFAULT_LANG = 'fr';

function getLocaleFromLang(lang) {
  if (lang === 'fr') {
    return 'fr-FR';
  }
  if (lang === 'en') {
    return 'en-US';
  }

  return null;
}

function getPagePath({ slug, lang }) {
  // Generate page path
  let pagePath = `/${slug}/`;

  // Handle home page slug
  if (!slug) {
    pagePath = '/';
  }

  // Add lang to the path
  if (lang !== DEFAULT_LANG) {
    pagePath = `/${lang}${pagePath}`;
  }

  return pagePath;
}

function getPageAlternates({ siteUrl, lang, nodes }) {
  return nodes.map(node => {
    const nodeLang = node.node_locale || node.lang;
    const pagePath = getPagePath({
      slug: node.node,
      lang: nodeLang,
    });
    return {
      current: nodeLang === lang,
      default: nodeLang === DEFAULT_LANG,
      path: pagePath,
      lang: nodeLang,
      locale: getLocaleFromLang(nodeLang),
      url: `${siteUrl}${pagePath}`,
    };
  });
}

function getAssetIdsFromRichTextJson(json) {
  return json.content
    .filter(node => {
      return node.nodeType === 'embedded-asset-block';
    })
    .map(node => node.data.target.sys.contentful_id);
}

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const { data } = await graphql(`
    {
      site {
        siteMetadata {
          siteUrl
        }
      }
      allHomeYaml {
        nodes {
          id
          slug
          lang
        }
      }
      allBriefListYaml {
        nodes {
          id
          slug
          lang
        }
      }
      allNewsYaml {
        nodes {
          id
          slug
          lang
        }
      }
      allCampaignsYaml {
        nodes {
          id
          slug
          lang
        }
      }
      allContactYaml {
        nodes {
          id
          slug
          lang
        }
      }
      allContentfulCampaign {
        nodes {
          contentful_id
          node_locale
          slug
          shortContent {
            json
          }
          content {
            json
          }
        }
      }
      allContentfulPage {
        nodes {
          contentful_id
          node_locale
          slug
        }
      }
    }
  `);

  const getParentSlug = ({ lang, contentType }) => {
    if (contentType === 'allContentfulCampaign') {
      const parent = data.allCampaignsYaml.nodes.find(node => {
        return node.lang === lang;
      });
      return parent.slug;
    }

    return null;
  };

  const { siteUrl } = data.site.siteMetadata;

  // Create static pages
  Object.keys(data)
    .filter(contentType => {
      return !!contentType.match(/all(.*)Yaml/);
    })
    .forEach(contentType => {
      // Generate template name
      const templateName = contentType.replace(/all(.*)Yaml/, '$1');

      data[contentType].nodes.forEach(({ slug, id, lang }) => {
        const pagePath = getPagePath({ slug, lang });
        const pageUrl = `${siteUrl}${pagePath}`;
        const locale = getLocaleFromLang(lang);

        const alternates = getPageAlternates({
          siteUrl,
          lang,
          nodes: data[contentType].nodes,
        });

        const page = {
          path: pagePath,
          component: path.resolve(`src/templates/${templateName}.jsx`),
          context: {
            name: templateName,
            id,
            lang,
            locale,
            url: pageUrl,
            alternates,
          },
        };
        createPage(page);
      });
    });

  // Create contentful pages
  Object.keys(data)
    .filter(contentType => {
      return contentType.indexOf('allContentful') === 0;
    })
    .forEach(contentType => {
      // Generate template name
      const templateName = contentType.replace('allContentful', '');

      data[contentType].nodes.forEach(
        ({ slug, contentful_id: id, node_locale: lang, ...rest }) => {
          const parentSlug = getParentSlug({ lang, contentType });
          const locale = getLocaleFromLang(lang);

          let fullSlug = slug;
          if (parentSlug) {
            fullSlug = `${parentSlug}/${fullSlug}`;
          }
          const pagePath = getPagePath({ slug: fullSlug, lang });
          const pageUrl = `${siteUrl}${pagePath}`;

          const alternates = getPageAlternates({
            siteUrl,
            lang,
            nodes: data[contentType].nodes,
          });

          const assetIds = [];
          if (contentType === 'allContentfulCampaign') {
            if (rest.content && rest.content.json) {
              assetIds.push(...getAssetIdsFromRichTextJson(rest.content.json));
            }
            if (rest.shortContent && rest.shortContent.json) {
              assetIds.push(
                ...getAssetIdsFromRichTextJson(rest.shortContent.json)
              );
            }
          }

          const page = {
            path: pagePath,
            component: path.resolve(`src/templates/${templateName}.jsx`),
            context: {
              name: templateName,
              id,
              lang,
              locale,
              url: pageUrl,
              alternates,
              assetIds,
            },
          };
          createPage(page);
        }
      );
    });
};

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;

  // https://github.com/gatsbyjs/gatsby/issues/17159#issuecomment-549091641
  createTypes([
    schema.buildObjectType({
      name: 'Ical',
      interfaces: ['Node'],
      fields: {
        isFuture: {
          type: 'Boolean!',
          resolve: source => new Date(source.start) > new Date(),
        },
      },
    }),
  ]);
};

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  if (stage === 'build-javascript') {
    actions.setWebpackConfig({
      devtool: false,
    });
  }
};
