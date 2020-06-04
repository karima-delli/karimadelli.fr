const path = require('path');
const { defaultLang, localesEnabled } = require('./i18n.config');

function getLocaleFromLang(lang) {
  return localesEnabled[lang] || null;
}

function getPagePath({ slug, lang, parentSlug }) {
  // Generate page path
  let pagePath = `/${slug}/`;

  // Handle home page slug
  if (!slug) {
    pagePath = '/';
  }

  if (parentSlug) {
    pagePath = `/${parentSlug}${pagePath}`;
  }

  // Add lang to the path
  if (lang !== defaultLang) {
    pagePath = `/${lang}${pagePath}`;
  }

  return pagePath;
}

function getParentNodes({ data, contentType }) {
  if (contentType === 'allContentfulCampaign') {
    return data.allCampaignsYaml.nodes;
  }
  if (contentType === 'allContentfulStatement') {
    return data.allStatementsYaml.nodes;
  }
  return null;
}

function getParentSlug({ parentNodes, lang }) {
  if (!parentNodes) {
    return null;
  }
  const parent = parentNodes.find((node) => {
    const nodeLang = node.node_locale || node.lang;
    return nodeLang === lang;
  });
  if (!parent) {
    return null;
  }
  return parent.slug;
}

function getPageAlternates({ siteUrl, lang, nodes, parentNodes }) {
  return (
    nodes
      // Keep only the nodes with an enabled lang
      .filter((node) => {
        const nodeLang = node.node_locale || node.lang;
        return !!localesEnabled[nodeLang];
      })
      .map((node) => {
        const nodeLang = node.node_locale || node.lang;
        const parentSlug = getParentSlug({ parentNodes, lang: nodeLang });

        const pagePath = getPagePath({
          slug: node.slug,
          lang: nodeLang,
          parentSlug,
        });

        const pageUrl = `${siteUrl}${pagePath}`;

        return {
          current: nodeLang === lang,
          default: nodeLang === defaultLang,
          path: pagePath,
          lang: nodeLang,
          locale: getLocaleFromLang(nodeLang),
          url: pageUrl,
        };
      })
  );
}

function getAssetIdsFromRichTextJson(json) {
  return json.content
    .filter((node) => {
      return node.nodeType === 'embedded-asset-block';
    })
    .map((node) => node.data.target.sys.contentful_id);
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
      allStatementsYaml {
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
      allNotFoundYaml {
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
      allContentfulStatement {
        nodes {
          contentful_id
          node_locale
          slug
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

  const { siteUrl } = data.site.siteMetadata;

  // Create static pages
  Object.keys(data)
    .filter((contentType) => {
      return !!contentType.match(/all(.*)Yaml/);
    })
    .forEach((contentType) => {
      // Generate template name
      const templateName = contentType.replace(/all(.*)Yaml/, '$1');

      data[contentType].nodes.forEach(({ slug, id, lang }) => {
        const pagePath = getPagePath({ slug, lang });
        const pageUrl = `${siteUrl}${pagePath}`;

        if (!localesEnabled[lang]) {
          return;
        }

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
        // eslint-disable-next-line no-console
        console.log(`Create static page ${pagePath} (lang: ${lang})`);

        createPage(page);
      });
    });

  // Create contentful pages
  Object.keys(data)
    .filter((contentType) => {
      return contentType.indexOf('allContentful') === 0;
    })
    .forEach((contentType) => {
      // Generate template name
      const templateName = contentType.replace('allContentful', '');

      data[contentType].nodes.forEach(
        ({ slug, contentful_id: id, node_locale: lang, ...rest }) => {
          const parentNodes = getParentNodes({ data, contentType });
          const parentSlug = getParentSlug({ parentNodes, lang });
          const locale = getLocaleFromLang(lang);
          const pagePath = getPagePath({ slug, lang, parentSlug });
          const pageUrl = `${siteUrl}${pagePath}`;

          const alternateNodes = data[contentType].nodes.filter((node) => {
            return node.contentful_id === id;
          });

          const alternates = getPageAlternates({
            siteUrl,
            lang,
            nodes: alternateNodes,
            parentNodes,
          });

          // Extract assets from rich text content
          const assetIds = [];
          if (
            contentType === 'allContentfulCampaign' ||
            contentType === 'allContentfulStatement' ||
            contentType === 'allContentfulPage'
          ) {
            Object.keys(rest).forEach((key) => {
              if (rest[key] && rest[key].json) {
                assetIds.push(...getAssetIdsFromRichTextJson(rest[key].json));
              }
            });
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

          // eslint-disable-next-line no-console
          console.log(`Create contentful page ${pagePath}`);
          createPage(page);
        }
      );
    });
};

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;

  createTypes(`
  type ContentfulCampaign implements Node {
    description: String
  }
  `);

  createTypes(`
  type ContentfulStatement implements Node {
    description: String
    image: ContentfulAsset
  }
  `);

  // https://github.com/gatsbyjs/gatsby/issues/17159#issuecomment-549091641
  createTypes([
    schema.buildObjectType({
      name: 'Ical',
      interfaces: ['Node'],
      fields: {
        isFuture: {
          type: 'Boolean!',
          resolve: (source) => new Date(source.start) > new Date(),
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
