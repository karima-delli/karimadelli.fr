import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Document, Page } from 'react-pdf';
import styled from 'styled-components';

const TitleContainerStyled = styled.div`
  width: 100%;
  transition: opacity 250ms ease;
`;

const TitleStyled = styled.div`
  text-align: center;
  background: ${({ theme }) => theme.officeGreen};
  color: #fff;
  font-weight: bold;
  padding: 1rem;
`;

const DocumentStyled = styled(Document)`
  transition: opacity 250ms ease;
`;

const PageStyled = styled(Page)`
  margin: auto;
  width: 100%;
  canvas {
    margin: auto;
  }
`;

const LinkStyled = styled.a`
  position: relative;
  display block;
  width: calc(300px + 2rem);
  max-width: 100%;
  overflow: hidden;
  margin: auto;

  &.loaded {
    border: 1rem solid ${({ theme }) => theme.officeGreen};
    ${TitleContainerStyled} {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);    
      padding: 2rem;      
    }
  }

  &:hover {
    ${DocumentStyled} {
      opacity: 0.5;
    }
    ${TitleContainerStyled} {
      opacity: 0.7;
    }    
  }
`;

const PdfDocument = ({ url }) => {
  const [loaded, setLoaded] = useState(false);
  const onLoadSuccess = () => {
    setLoaded(true);
  };

  return (
    <LinkStyled
      href={url}
      target="_blank"
      rel="noreferrer"
      className={`${loaded ? 'loaded' : false}`}
    >
      <DocumentStyled
        file={url}
        loading=""
        noData=""
        error=""
        onLoadSuccess={onLoadSuccess}
      >
        <PageStyled pageNumber={1} width={240} />
      </DocumentStyled>
      <TitleContainerStyled>
        <TitleStyled>Voir le document</TitleStyled>
      </TitleContainerStyled>
    </LinkStyled>
  );
};

PdfDocument.propTypes = {
  url: PropTypes.string.isRequired,
};

export default PdfDocument;
