import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import RichText from '../RichText';

const SectionStyled = styled.section`
  background: ${({ theme }) => theme.grey};
`;

const DotStyled = styled.div`
  width: 1rem;
  height: 1rem;
  display: inline-block;
  border-radius: 1rem;
  background: ${({ theme }) => theme.officeGreen};
  margin-right: 1.2rem;
  position: relative;
  top: 2px;
`;

const TitleStyled = styled.h3`
  font-family: ${({ theme }) => theme.fontFamiliesAlternate};
  text-transform: uppercase;
  line-height: 1.1rem;
  margin-bottom: 2rem;
  font-size: 1.1rem;
`;

const ShortContent = ({ title, content, richTextAssets }) => (
  <SectionStyled className="section">
    <div className="container">
      <TitleStyled>
        <DotStyled />
        {title}
      </TitleStyled>
      <RichText json={content.json} assets={richTextAssets} />
    </div>
  </SectionStyled>
);

ShortContent.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.shape({
    json: PropTypes.shape({}).isRequired,
  }).isRequired,
  richTextAssets: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default ShortContent;
