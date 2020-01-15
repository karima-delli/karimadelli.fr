/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';
import GatsbyImage from 'gatsby-image';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Hr from '../Hr';
import Link from '../Link';
import Iframe from '../Iframe';
import './style.scss';

const RichText = ({ json, assets }) => {
  const getAsset = contentfulId => {
    return assets.find(asset => asset.contentful_id === contentfulId);
  };

  const options = {
    renderNode: {
      [INLINES.HYPERLINK]: (node, children) => (
        <Link url={node.data.uri}>{children}</Link>
      ),
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
      [BLOCKS.HR]: () => <Hr />,
      [BLOCKS.EMBEDDED_ENTRY]: node => {
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
        console.log(props);

        return <Iframe {...props} />;
      },
      [BLOCKS.EMBEDDED_ASSET]: node => {
        const asset = getAsset(node.data.target.sys.contentful_id);
        if (!asset) {
          return <></>;
        }
        return <GatsbyImage fluid={asset.localFile.childImageSharp.fluid} />;
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
      contentful_id: PropTypes.string.isRequired,
      localFile: PropTypes.shape({
        childImageSharp: PropTypes.shape({}).isRequired,
      }).isRequired,
    })
  ),
};

RichText.defaultProps = {
  assets: [],
};

export default RichText;
