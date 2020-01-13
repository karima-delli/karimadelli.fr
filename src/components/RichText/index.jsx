import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GatsbyImage from 'gatsby-image';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import './style.scss';

const RichText = ({ json, assets }) => {
  const getAsset = contentfulId => {
    return assets.find(asset => asset.contentful_id === contentfulId);
  };

  const options = {
    renderNode: {
      // eslint-disable-next-line react/display-name
      [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
        console.log(node);
        const asset = getAsset(node.data.target.sys.contentful_id);

        if (!asset) {
          return <></>;
        }

        console.log(asset);

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
