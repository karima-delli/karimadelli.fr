const path = require('path');

const DEFAULT_LOCALE = 'fr';

function getPagePath({ slug, locale }) {
  // Generate page path
  let pagePath = `/${slug}/`;

  // Handle home page slug
  if (!slug) {
    pagePath = '/';
  }

  // Add locale
  if (locale !== DEFAULT_LOCALE) {
    pagePath = `/${locale}${pagePath}`;
  }

  return pagePath;
}

function getPageAlternates({ siteUrl, locale, nodes }) {
  return nodes.map(node => {
    const pagePath = getPagePath({
      slug: node.node,
      locale: node.node_locale,
    });
    return {
      current: node.node_locale === locale,
      default: node.node_locale === DEFAULT_LOCALE,
      path: pagePath,
      locale,
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
      allContentfulHomePage {
        nodes {
          contentful_id
          node_locale
        }
      }
      allContentfulCampaignsPage {
        nodes {
          contentful_id
          node_locale
          slug
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
      allContentfulContactPage {
        nodes {
          contentful_id
          node_locale
          slug
        }
      }
      allContentfulContentPage {
        nodes {
          contentful_id
          node_locale
          slug
        }
      }
    }
  `);

  const { siteUrl } = data.site.siteMetadata;

  Object.keys(data)
    .filter(contentType => {
      return contentType.indexOf('allContentful') === 0;
    })
    .forEach(contentType => {
      // Generate template name
      const templateName = contentType.replace('allContentful', '');

      data[contentType].nodes.forEach(
        ({ slug, contentful_id: id, node_locale: locale, ...rest }) => {
          const pagePath = getPagePath({ slug, locale });
          const pageUrl = `${siteUrl}${pagePath}`;

          const alternates = getPageAlternates({
            siteUrl,
            locale,
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
            path: getPagePath({ slug, locale }),
            component: path.resolve(`src/templates/${templateName}.jsx`),
            context: {
              name: templateName,
              id,
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
