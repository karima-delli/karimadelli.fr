import React from 'react';
import PropTypes from 'prop-types';
import styled, { useTheme } from 'styled-components';
import GatsbyImage from 'gatsby-image';
import Triangle from '../Triangle';
import Link from '../Link';
import Button from '../Button';

const ContainerStyled = styled.div`
  position: relative;
  width: 100%;
  padding-top: ${(308 / 720) * 100 * 0.5}%;
`;

const ImageContainerStyled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding-bottom: ${(308 / 720) * 100}%;

  .gatsby-image-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const SectionStyled = styled.section`
  margin: auto;
  padding: 0 !important;
  width: 90%;

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    width: 80%;
  }
`;

const ContentStyled = styled.div`
  background: white;
  padding: 1.5rem;
  text-align: center;
  border: 1px solid #e3e3e3;
  border-top: none;
`;

const TriangleContainerStyled = styled.div`
  position: relative;
  top: 0.5px;
`;

const TriangleStyled = styled(Triangle)`
  display: block;
  width: 100%;
`;

const CategoryStyled = styled.div`
  color: ${({ theme }) => theme.brownGrey};
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.8rem;
  margin-bottom: 1rem;
`;

const TitleStyled = styled.h1`
  font-family: ${({ theme }) => theme.fontFamiliesAlternate};
  font-size: 1.7rem;
  line-height: 100%;
  margin-bottom: 1rem;
`;

const SubTitleStyled = styled.p`
  color: #505050;
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
  image,
  title,
  subTitle,
  category,
  slug,
  campaignsSlug,
  readMoreButtonTitle,
}) => {
  const theme = useTheme();
  const url = `${campaignsSlug}${slug}`;

  return (
    <ContainerStyled>
      <ImageContainerStyled>
        <GatsbyImage fluid={image.fluid} style={{ position: 'absolute' }} />
      </ImageContainerStyled>

      <SectionStyled className="section">
        <TriangleContainerStyled className="container">
          <TriangleStyled color="#ffffff" direction="right" reverse />
        </TriangleContainerStyled>
        <ContentStyled className="container">
          <CategoryStyled>{category}</CategoryStyled>
          <LinkStyled url={url}>
            <TitleStyled as={`h${baseTitleTag}`}>{title}</TitleStyled>
          </LinkStyled>
          <SubTitleStyled as={`h${baseTitleTag + 1}`}>
            {subTitle}
          </SubTitleStyled>
          <Button
            url={url}
            title={readMoreButtonTitle}
            color={theme.officeGreen}
            underlined
          />
        </ContentStyled>
      </SectionStyled>
    </ContainerStyled>
  );
};

CampaignBlock.propTypes = {
  baseTitleTag: PropTypes.number.isRequired,
  image: PropTypes.shape({
    fluid: PropTypes.shape({}).isRequired,
  }).isRequired,
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  campaignsSlug: PropTypes.string.isRequired,
  readMoreButtonTitle: PropTypes.string.isRequired,
};

export default CampaignBlock;
