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
    const nodeLocale = node.node_locale || node.lang;
    const pagePath = getPagePath({
      slug: node.node,
      locale: nodeLocale,
    });
    return {
      current: nodeLocale === locale,
      default: nodeLocale === DEFAULT_LOCALE,
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
      allHomeYaml {
        nodes {
          id
          slug
          lang
        }
      }
      allBrevesYaml {
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

  const getParentSlug = ({ locale, contentType }) => {
    if (contentType === 'allContentfulCampaign') {
      const parent = data.allCampaignsYaml.nodes.find(node => {
        return node.lang === locale;
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

      data[contentType].nodes.forEach(({ slug, id, lang: locale }) => {
        const pagePath = getPagePath({ slug, locale });
        const pageUrl = `${siteUrl}${pagePath}`;

        const alternates = getPageAlternates({
          siteUrl,
          locale,
          nodes: data[contentType].nodes,
        });

        const page = {
          path: pagePath,
          component: path.resolve(`src/templates/${templateName}.jsx`),
          context: {
            name: templateName,
            id,
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
        ({ slug, contentful_id: id, node_locale: locale, ...rest }) => {
          const parentSlug = getParentSlug({ locale, contentType });

          let fullSlug = slug;
          if (parentSlug) {
            fullSlug = `${parentSlug}/${fullSlug}`;
          }
          const pagePath = getPagePath({ slug: fullSlug, locale });
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
            path: pagePath,
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
