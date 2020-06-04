import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled, { useTheme } from 'styled-components';
import Title from '../Title';
import TextMarkdown from '../TextMarkdown';
import Button from '../Button';
import StatementBlock from './StatementBlock';

const TitleWrapperStyled = styled.div`
  margin-bottom: 1rem;
`;

const TextStyled = styled(TextMarkdown)`
  margin-bottom: 2rem;
  font-size: 1.5rem;
  text-align: center;
`;

const StatementContainerStyled = styled.div`
  margin-bottom: 2rem;
`;

const ButtonContainerStyled = styled.div`
  text-align: center;
`;

const StatementsBlock = ({
  baseTitleTag,
  title,
  text,
  readMoreButtonTitle,
  statementsSlug,
  statements,
  allButton,
}) => {
  const theme = useTheme();

  return (
    <section className="section">
      <div className="container">
        <TitleWrapperStyled>
          <Title section as={`h${baseTitleTag}`}>
            {title}
          </Title>
        </TitleWrapperStyled>
        <TextStyled>{text}</TextStyled>

        <StatementContainerStyled>
          {statements.map((statement) => (
            <StatementBlock
              key={statement.slug}
              {...statement}
              baseTitleTag={baseTitleTag + 1}
              statementsSlug={statementsSlug}
              readMoreButtonTitle={readMoreButtonTitle}
            />
          ))}
        </StatementContainerStyled>

        {allButton && (
          <ButtonContainerStyled>
            <Button
              {...allButton}
              background={theme.officeGreen}
              color={theme.white}
            />
          </ButtonContainerStyled>
        )}
      </div>
    </section>
  );
};

StatementsBlock.propTypes = {
  baseTitleTag: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  readMoreButtonTitle: PropTypes.string.isRequired,
  statementsSlug: PropTypes.string.isRequired,
  allButton: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
  statements: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.shape({}),
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

StatementsBlock.defaultProps = {
  allButton: null,
};

export default StatementsBlock;

export const query = graphql`
  fragment StatementsBlock on Query {
    statementsBlock: statementsBlockYaml(lang: { eq: $lang }) {
      title
      text
      readMoreButtonTitle
      statementsSlug
      allButton {
        title
        url
      }
    }
  }
`;
