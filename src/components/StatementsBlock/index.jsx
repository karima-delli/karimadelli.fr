import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled, { ThemeContext } from 'styled-components';
import SectionTitle from '../SectionTitle';
import TextMarkdown from '../TextMarkdown';
import Button from '../Button';
import StatementBlock from './StatementBlock';

const TitleStyled = styled(SectionTitle)`
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
  title,
  text,
  readMoreButtonTitle,
  statementsSlug,
  statements,
  allButton,
}) => {
  const theme = useContext(ThemeContext);

  return (
    <section className="section">
      <div className="container">
        <TitleStyled>{title}</TitleStyled>
        <TextStyled>{text}</TextStyled>

        <StatementContainerStyled>
          {statements.map(statement => (
            <StatementBlock
              key={statement.slug}
              {...statement}
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
