import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';
import SectionTitle from '../../SectionTitle';
import TextMarkdown from '../../TextMarkdown';
import Button from '../../Button';
import CampaignBlock from './CampaignBlock';

const TitleStyled = styled(SectionTitle)`
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

const CampaignsSection = ({
  title,
  text,
  readMoreButtonTitle,
  campaignsSlug,
  campaigns,
  allButton,
}) => {
  const theme = useContext(ThemeContext);

  return (
    <section className="section">
      <div className="container">
        <TitleStyled>{title}</TitleStyled>
        <TextStyled>{text}</TextStyled>
        <div className="columns is-multiline">
          {campaigns.map((campaign, index) => (
            <div
              className={`column ${index === 0 ? 'is-full' : 'is-half'}`}
              key={campaign.slug}
            >
              <CampaignBlock
                {...campaign}
                campaignsSlug={campaignsSlug}
                readMoreButtonTitle={readMoreButtonTitle}
              />
            </div>
          ))}
        </div>
        <ButtonContainerStyled>
          <Button
            {...allButton}
            background={theme.officeGreen}
            color={theme.white}
          />
        </ButtonContainerStyled>
      </div>
    </section>
  );
};

CampaignsSection.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  readMoreButtonTitle: PropTypes.string.isRequired,
  campaignsSlug: PropTypes.string.isRequired,
  allButton: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  campaigns: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.shape({}).isRequired,
      title: PropTypes.string.isRequired,
      subTitle: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CampaignsSection;
