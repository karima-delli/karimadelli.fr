import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import LinksMetadata from './LinksMetadata';
import OgMetadata from './OgMetadata';
import TwitterMetadata from './TwitterMetadata';

const Metadata = ({ metadata, locale, lang, url, alternates }) => {
  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              siteUrl
              siteName
              twitterNickname
            }
          }
        }
      `}
      render={data => {
        const globalMetadata = data.site.siteMetadata;
        const { title, description } = metadata;

        const alternateLinks = alternates.map(alternate => {
          return {
            lang: alternate.lang,
            href: alternate.url,
          };
        });

        const ogLocales = alternates.map(alternate => {
          return {
            locale: alternate.locale,
            current: alternate.locale === locale,
          };
        });

        const ogImageUrl =
          metadata.socialImages &&
          metadata.socialImages.default &&
          `${globalMetadata.siteUrl}${metadata.socialImages.default}`;

        const twitterImageUrl =
          metadata.socialImages &&
          metadata.socialImages.twitter &&
          `${globalMetadata.siteUrl}${metadata.socialImages.twitter}`;

        return (
          <>
            <Helmet
              htmlAttributes={{
                lang,
              }}
            >
              <meta charSet="utf-8" />
              <meta httpEquiv="x-ua-compatible" content="ie=edge" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no"
              />
              <title>{title}</title>
              <meta name="description" content={description} />
            </Helmet>

            <LinksMetadata canonicalUrl={url} alternateLinks={alternateLinks} />

            <OgMetadata
              siteName={globalMetadata.siteName}
              type="website"
              title={title}
              locales={ogLocales}
              description={description}
              imageUrl={ogImageUrl}
              url={url}
            />

            <TwitterMetadata
              card="summary"
              site={globalMetadata.twitterNickname}
              title={title}
              description={description}
              imageUrl={twitterImageUrl}
            />
          </>
        );
      }}
    />
  );
};

Metadata.propTypes = {
  metadata: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    socialImages: PropTypes.shape({
      default: PropTypes.string,
      twitter: PropTypes.string,
    }),
  }),
  locale: PropTypes.string.isRequired,
  lang: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  alternates: PropTypes.arrayOf(
    PropTypes.shape({
      current: PropTypes.bool.isRequired,
      lang: PropTypes.string.isRequired,
      locale: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
};

Metadata.defaultProps = {
  metadata: {},
};

export default Metadata;
