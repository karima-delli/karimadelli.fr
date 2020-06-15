import React from 'react';
import PropTypes from 'prop-types';
import styled, { useTheme } from 'styled-components';
import Link from '../Link';
import Button from '../Button';

const SectionStyled = styled.section`
  margin: auto;
  padding: 0 !important;
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const ContentStyled = styled.div`
  background: white;
  padding: 1.5rem;
  text-align: center;
  border: 1px solid #e3e3e3;
`;

const DateStyled = styled.div`
  color: ${({ theme }) => theme.brownGrey};
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.8rem;
  margin-bottom: 1rem;
`;

const TitleStyled = styled.h3`
  font-family: ${({ theme }) => theme.fontFamiliesAlternate};
  font-size: 1.5rem;
  line-height: 100%;
  margin-bottom: 1rem;
`;

const LinkStyled = styled(Link)`
  color: ${({ theme }) => theme.licorice};

  &:hover {
    ${TitleStyled} {
      text-decoration: underline;
    }
  }
`;

const CampaignBlock = ({
  baseTitleTag,
  title,
  slug,
  date,
  statementsSlug,
  readMoreButtonTitle,
}) => {
  const theme = useTheme();
  const url = `${statementsSlug}${slug}`;

  return (
    <SectionStyled className="section">
      <ContentStyled className="container">
        <DateStyled>{date}</DateStyled>
        <LinkStyled url={url}>
          <TitleStyled as={`h${baseTitleTag}`}>{title}</TitleStyled>
        </LinkStyled>
        <Button
          url={url}
          title={readMoreButtonTitle}
          color={theme.officeGreen}
          underlined
        />
      </ContentStyled>
    </SectionStyled>
  );
};

CampaignBlock.propTypes = {
  baseTitleTag: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  statementsSlug: PropTypes.string.isRequired,
  readMoreButtonTitle: PropTypes.string.isRequired,
};

CampaignBlock.defaultProps = {};

export default CampaignBlock;
