import React from 'react';
import PropTypes from 'prop-types';
import styled, { useTheme } from 'styled-components';
import GatsbyImage from 'gatsby-image';
import { lighten } from 'polished';
import Carousel, { Context as CarouselContext, Slide } from '../../Carousel';
import Button from '../../Button';
import Triangle from '../../Triangle';
import ContentSlideTransition from './ContentSlideTransition';

const CarouselImageContainerStyled = styled.div`
  position: relative;
  width: 100%;
  max-height: 100%;
  overflow: hidden;
  padding-bottom: ${(9 / 16) * 100}%;
`;

const TriangleStyled = styled(Triangle)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
`;

const CarouselContentContainerStyled = styled.div`
  text-align: center;
  border: 0.8rem solid ${({ theme }) => theme.fluorescentOrange};
  padding: 1.5rem;
  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    padding: 2rem;
    border-width: 1rem;
  }
`;

const DotsContainerStyled = styled.div`
  margin-bottom: 1rem;
`;

const DotStyled = styled.div`
  display: inline-block;
  background: ${({ theme }) => theme.fluorescentOrange};
  transition: background 230ms ease;
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 0.7rem;

  @media (min-width: ${({ theme }) => theme.breakpointTablet}) {
    width: 1rem;
    height: 1rem;
    border-radius: 1rem;
  }

  &.is-current {
    background: ${({ theme }) => theme.licorice};
  }

  &:not(.is-current) {
    cursor: pointer;
    &:hover {
      background: ${({ theme }) => lighten(0.05, theme.fluorescentOrange)};
    }
  }

  &:not(:last-child) {
    margin-right: 1rem;
  }
`;

const SlideContentContainerStyled = styled.div`
  position: relative;
  margin-bottom: 2rem;
`;

const SlideContentTitleStyled = styled.h3`
  font-family: ${({ theme }) => theme.fontFamiliesAlternate};
  text-transform: uppercase;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const SlideContentTextStyled = styled.p``;

const HomeCarousel = ({ button, slides }) => {
  const theme = useTheme();

  return (
    <div className="container">
      <Carousel slideCount={slides.length} timeout={5000}>
        <CarouselContext.Consumer>
          {({ currentSlideIndex, loadSlide }) => (
            <>
              <CarouselImageContainerStyled>
                {/* image */}
                {slides.map((slide, index) => (
                  <Slide
                    key={index}
                    className={`${
                      currentSlideIndex === index ? 'is-current' : ''
                    }`}
                  >
                    <GatsbyImage fluid={slide.image.fluid} />
                  </Slide>
                ))}
                <TriangleStyled color={theme.white} direction="left" />
              </CarouselImageContainerStyled>
              <CarouselContentContainerStyled>
                {/* dots */}
                <DotsContainerStyled>
                  {slides.map((slide, index) => (
                    <DotStyled
                      key={index}
                      className={`${
                        currentSlideIndex === index ? 'is-current' : ''
                      }`}
                      onClick={() => loadSlide(index)}
                    />
                  ))}
                </DotsContainerStyled>
                {/* content */}
                <SlideContentContainerStyled>
                  <ContentSlideTransition id={currentSlideIndex}>
                    <div>
                      <SlideContentTitleStyled>
                        {slides[currentSlideIndex].title}
                      </SlideContentTitleStyled>
                      <SlideContentTextStyled>
                        {slides[currentSlideIndex].text}
                      </SlideContentTextStyled>
                    </div>
                  </ContentSlideTransition>
                </SlideContentContainerStyled>
                {/* button */}
                <Button {...button} color={theme.licorice} underlined />
              </CarouselContentContainerStyled>
            </>
          )}
        </CarouselContext.Consumer>
      </Carousel>
    </div>
  );
};

HomeCarousel.propTypes = {
  button: PropTypes.shape({}).isRequired,
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.shape({
        fluid: PropTypes.shape({}).isRequired,
      }).isRequired,
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default HomeCarousel;
