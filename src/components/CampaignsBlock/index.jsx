import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled, { useTheme } from 'styled-components';
import Title from '../Title';
import TextMarkdown from '../TextMarkdown';
import Button from '../Button';
import CampaignBlock from './CampaignBlock';

const TitleWrapperStyled = styled.div`
  margin-bottom: 1rem;
`;

const TextStyled = styled(TextMarkdown)`
  margin-bottom: 2rem;
  font-size: 1.5rem;
  text-align: center;
`;

const ButtonContainerStyled = styled.div`
  text-align: center;
`;

const CampaignsBlock = ({
  baseTitleTag,
  onePerLine,
  title,
  text,
  readMoreButtonTitle,
  campaignsSlug,
  campaigns,
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
        <div className="columns is-multiline">
          {campaigns.map((campaign, index) => (
            <div
              className={`column ${
                index === 0 || onePerLine ? 'is-full' : 'is-half'
              }`}
              key={campaign.slug}
            >
              <CampaignBlock
                {...campaign}
                baseTitleTag={baseTitleTag + 1}
                campaignsSlug={campaignsSlug}
                readMoreButtonTitle={readMoreButtonTitle}
              />
            </div>
          ))}
        </div>
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

CampaignsBlock.propTypes = {
  baseTitleTag: PropTypes.number.isRequired,
  onePerLine: PropTypes.bool,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  readMoreButtonTitle: PropTypes.string.isRequired,
  campaignsSlug: PropTypes.string.isRequired,
  allButton: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
  campaigns: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.shape({}).isRequired,
      title: PropTypes.string.isRequired,
      subTitle: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
};

CampaignsBlock.defaultProps = {
  onePerLine: false,
  allButton: null,
};

export default CampaignsBlock;

export const query = graphql`
  fragment CampaignsBlock on Query {
    campaignsBlock: campaignsBlockYaml(lang: { eq: $lang }) {
      title
      text
      readMoreButtonTitle
      campaignsSlug
      allButton {
        title
        url
      }
    }
  }
`;
