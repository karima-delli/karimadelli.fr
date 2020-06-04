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
              socialImages {
                default
                twitter
              }
            }
          }
        }
      `}
      render={(data) => {
        const globalMetadata = data.site.siteMetadata;
        const {
          siteUrl,
          siteName,
          twitterNickname,
          socialImages: socialImagesDefault,
        } = globalMetadata;
        const { title, description, socialImages = {} } = metadata;

        const alternateLinks = alternates.map((alternate) => {
          return {
            lang: alternate.lang,
            href: alternate.url,
          };
        });

        const ogLocales = alternates.map((alternate) => {
          return {
            locale: alternate.locale,
            current: alternate.locale === locale,
          };
        });

        const ogImageUrl =
          socialImages.default || `${siteUrl}${socialImagesDefault.default}`;
        const twitterImageUrl =
          socialImages.twitter || `${siteUrl}${socialImagesDefault.default}`;

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
              {description && <meta name="description" content={description} />}
            </Helmet>

            <LinksMetadata canonicalUrl={url} alternateLinks={alternateLinks} />

            <OgMetadata
              siteName={siteName}
              type="website"
              title={title}
              locales={ogLocales}
              description={description}
              imageUrl={ogImageUrl}
              url={url}
            />

            <TwitterMetadata
              card="summary"
              site={twitterNickname}
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
  locale: PropTypes.string,
  lang: PropTypes.string,
  url: PropTypes.string,
  alternates: PropTypes.arrayOf(
    PropTypes.shape({
      current: PropTypes.bool.isRequired,
      lang: PropTypes.string.isRequired,
      locale: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ),
};

Metadata.defaultProps = {
  metadata: {},
  locale: null,
  lang: null,
  url: null,
  alternates: [],
};

export default Metadata;
