import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { darken } from 'polished';
import ExternalLinkIcon from '../Icons/ExternalLink';
import Link from '../Link';

const StatementHeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StatementDateStyled = styled.div`
  font-size: 0.8rem;
  font-weight: 300;
`;

const StatementLinkStyled = styled.div`
  svg {
    color: ${({ theme }) => theme.veryLightPink};
  }
  a:hover svg {
    color: ${({ theme }) => darken(0.5, theme.veryLightPink)};
  }
`;

const StatementTitleStyled = styled.h4`
  font-weight: bold;
  margin: 0.5rem 0;
`;

const StatementContainerStyled = styled(Link)`
  display: block;
  background: ${({ theme }) => theme.white};
  padding: 0.75rem;
  color: ${({ theme }) => theme.licorice};
  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  &:hover {
    svg {
      color: ${({ theme }) => darken(0.5, theme.veryLightPink)};
    }

    ${StatementTitleStyled} {
      text-decoration: underline;
    }
  }
`;

const NewsStatements = ({ titleTag, statements }) => (
  <div>
    {statements.map((statement) => (
      <StatementContainerStyled
        url={`/mes-actualites/communiques/${statement.slug}`}
        key={statement.slug}
      >
        <StatementHeaderStyled>
          <StatementDateStyled>{statement.date}</StatementDateStyled>
          <StatementLinkStyled>
            <ExternalLinkIcon />
          </StatementLinkStyled>
        </StatementHeaderStyled>
        <StatementTitleStyled as={titleTag}>
          {statement.title}
        </StatementTitleStyled>
      </StatementContainerStyled>
    ))}
  </div>
);

NewsStatements.propTypes = {
  titleTag: PropTypes.string.isRequired,
  statements: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default NewsStatements;
