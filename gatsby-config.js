const dotenv = require('dotenv');

dotenv.config();

const { NODE_ENV, APP_ENV = 'development', NETLIFY } = process.env;

// eslint-disable-next-line no-console
console.log(`NODE_ENV ${NODE_ENV}`);

// eslint-disable-next-line no-console
console.log(`APP_ENV ${APP_ENV}`);

const isProduction = APP_ENV === `production`;

let siteUrl = 'http://localhost:8002'; // TODO: should automatically fetch that

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
};

module.exports = {
  siteMetadata,
  plugins: [
    'gatsby-transformer-sharp',
    `gatsby-plugin-sharp`,
    // {
    //   resolve: 'gatsby-source-filesystem',
    //   options: {
    //     name: 'imagesSrc',
    //     path: `${__dirname}/src/images`,
    //   },
    // },
    // {
    //   resolve: 'gatsby-source-filesystem',
    //   options: {
    //     name: 'imagesStatic',
    //     path: `${__dirname}/static/images`,
    //   },
    // },
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
      },
    },
    // {
    //   resolve: 'gatsby-plugin-manifest',
    //   options: {
    //     name: 'Karima Delli',
    //     short_name: 'Karima Delli',
    //     start_url: '/',
    //     lang: 'fr',
    //     background_color: '#ffffff',
    //     theme_color: '#00456e', // TODO: configure from theme
    //     display: 'standalone',
    //     icon: 'src/images/favicon.png',
    //     legacy: true,
    //     localize: [
    //       {
    //         start_url: '/en/',
    //         lang: 'en',
    //       },
    //     ],
    //   },
    // },
    'gatsby-plugin-react-helmet',
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     // Note: the plugin should be able to get the NODE_ENV but because Gatsby
    //     // override the NODE_ENV when building, it gets ignored.
    //     trackingId: isProduction ? null : null,
    //     anonymize: true,
    //     respectDNT: true,
    //   },
    // },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {},
    },
    {
      resolve: 'gatsby-plugin-sitemap',
    },
  ],
};
