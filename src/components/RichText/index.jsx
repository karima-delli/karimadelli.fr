/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GatsbyImage from 'gatsby-image';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import PdfDocument from '../PdfDocument';
import Hr from '../Hr';
import Link from '../Link';
import Iframe from '../Iframe';
import './style.scss';

const HrStyled = styled(Hr)`
  margin-bottom: 2rem;
`;

const IframeStyled = styled(Iframe)`
  margin-bottom: 2rem;
`;

const GatsbyImageStyled = styled(GatsbyImage)`
  margin-bottom: 2rem;
`;

const RichText = ({ json, assets }) => {
  const getAsset = (contentfulId) => {
    return assets.find((asset) => asset.contentful_id === contentfulId);
  };

  const options = {
    renderNode: {
      [INLINES.HYPERLINK]: (node, children) => (
        <Link url={node.data.uri}>{children}</Link>
      ),
      [INLINES.ASSET_HYPERLINK]: (node, children) => {
        // eslint-disable-next-line camelcase
        if (!node.data?.target?.sys?.contentful_id) {
          return <>{children}</>;
        }
        const asset = getAsset(node.data.target.sys.contentful_id);
        if (!(asset && asset.localFile && asset.localFile.publicURL)) {
          return <>{children}</>;
        }
        return (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={asset.localFile.publicURL}
          >
            {children}
          </a>
        );
      },
      [BLOCKS.UL_LIST]: (node, children) => (
        <div className="content">
          <ul>{children}</ul>
        </div>
      ),
      [BLOCKS.OL_LIST]: (node, children) => (
        <div className="content">
          <ol>{children}</ol>
        </div>
      ),
      [BLOCKS.HR]: () => <HrStyled />,
      [BLOCKS.EMBEDDED_ENTRY]: (node) => {
        if (!node?.data?.target?.fields) {
          return null;
        }
        const props = Object.keys(node.data.target.fields).reduce(
          (acc, key) => {
            const value = node.data.target.fields[key];
            if (typeof value === 'object') {
              // eslint-disable-next-line prefer-destructuring
              acc[key] = Object.values(value)[0];
            } else {
              acc[key] = value;
            }
            return acc;
          },
          {}
        );
        return <IframeStyled {...props} />;
      },
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const asset = getAsset(node.data.target.sys.contentful_id);
        if (!asset) {
          return <></>;
        }

        if (
          asset.file.contentType === 'application/pdf' &&
          asset.localFile.publicURL
        ) {
          return <PdfDocument url={asset.localFile.publicURL} />;
        }

        if (asset.localFile.childImageSharp.fluid) {
          return (
            <GatsbyImageStyled fluid={asset.localFile.childImageSharp.fluid} />
          );
        }

        return <></>;
      },
    },
  };

  return (
    <div className="rich-text">{documentToReactComponents(json, options)}</div>
  );
};

RichText.propTypes = {
  json: PropTypes.shape({}).isRequired,
  assets: PropTypes.arrayOf(
    PropTypes.shape({
      contentful_id: PropTypes.string,
      file: PropTypes.shape({
        contentType: PropTypes.string,
      }),
      localFile: PropTypes.shape({
        publicURL: PropTypes.string,
        childImageSharp: PropTypes.shape({}),
      }).isRequired,
    })
  ),
};

RichText.defaultProps = {
  assets: [],
};

export default RichText;
