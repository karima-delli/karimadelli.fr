const dotenv = require('dotenv');
const { defaultLang, localesEnabled } = require('./i18n.config');

dotenv.config();

const {
  NODE_ENV,
  APP_ENV = 'development',
  NETLIFY,
  CONTENTFUL_HOST,
  CONTENTFUL_SPACE_ID,
  CONTENTFUL_ACCESS_TOKEN,
} = process.env;

// eslint-disable-next-line no-console
console.log(`NODE_ENV ${NODE_ENV}`);

// eslint-disable-next-line no-console
console.log(`APP_ENV ${APP_ENV}`);

const isProduction = APP_ENV === `production`;

let siteUrl = 'http://localhost:8002'; // TODO: should automatically the port

if (NETLIFY) {
  if (isProduction) {
    siteUrl = 'https://karimadelli.fr';
  } else {
    siteUrl = process.env.DEPLOY_PRIME_URL;
  }
}

// eslint-disable-next-line no-console
console.log(`deploying on ${siteUrl}`);

const siteMetadata = {
  siteUrl,
  siteName: 'Karima Delli',
  title: 'Karima Delli',
  twitterNickname: '@KarimaDelli',
  socialImages: {
    default: '/images/social/default.png',
    twitter: '/images/social/twitter.png',
  },
  calendarUrlPublicUrl: process.env.ICAL_URL,
  calendarUrlIcalUrl: process.env.ICAL_URL,
  europarlPageUrl: process.env.EUROPARL_PAGE_URL,
};

module.exports = {
  siteMetadata,
  plugins: [
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        defaultQuality: 75,
      },
    },
    'gatsby-transformer-yaml',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/data`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static`,
      },
    },
    {
      resolve: 'gatsby-source-contentful',
      options: {
        host: CONTENTFUL_HOST || undefined,
        spaceId: CONTENTFUL_SPACE_ID,
        accessToken: CONTENTFUL_ACCESS_TOKEN,
        // Download asset localy to be able to use gatsby image.
        downloadLocal: true,
      },
    },
    {
      resolve: 'gatsby-contentful-rich-text-reading-time',
      options: {
        types: [
          { name: 'contentfulStatementContentRichTextNode', field: 'content' },
          { name: 'contentfulCampaignContentRichTextNode', field: 'content' },
          {
            name: 'contentfulCampaignShortContentRichTextNode',
            field: 'shortContent',
          },
          {
            name: 'contentfulPageContentRichTextNode',
            field: 'content',
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/Layout.jsx`),
      },
    },
    {
      resolve: 'gatsby-plugin-styled-components',
      options: {
        // By default, the displayName of a component will be prefixed with the filename
        // in order to make the component name as unique as possible.
        fileName: false,
        displayName: false,
      },
    },
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-purgecss', // purges all unused/unreferenced css rules
      options: {
        develop: false, // Activates purging in npm run develop
        printRejected: false,
        ignore: ['src/styles/styledComponentsTheme.module.scss'],
      },
    },
    'gatsby-plugin-twitter',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Karima Delli',
        short_name: 'Karima Delli',
        start_url: '/',
        lang: 'fr',
        background_color: '#ffffff',
        theme_color: '#126e00',
        display: 'standalone',
        icon: 'src/images/favicon.png',
        legacy: true,
        localize: Object.keys(localesEnabled)
          .filter((lang) => lang !== defaultLang)
          .map((lang) => {
            return {
              start_url: `/${lang}/`,
              lang,
            };
          }),
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // Note: the plugin should be able to get the NODE_ENV but because Gatsby
        // override the NODE_ENV when building, it gets ignored.
        trackingId: isProduction ? 'UA-149773608-1' : null,
        anonymize: true,
        respectDNT: true,
      },
    },
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: ['Alegreya Sans:800', 'Ubuntu:300,400,700'],
        display: 'swap',
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {},
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        exclude: Object.keys(localesEnabled)
          .filter((lang) => lang !== defaultLang)
          .map((lang) => `/${lang}/404`),
      },
    },
  ],
};
