import React from 'react';
import styled from 'styled-components';
import cardBackImage from '../assets/cardback.png';

const cardStyles = `
  height: 150px;
  width: 150px;
  justify-content: center;
  align-items: center;
  display: flex;
  border: 2px solid #4A4A4A;
  border-radius: 8px;
  background-color: white;
  position: absolute;
  transition: transform ease-in-out .5s;
  backface-visibility: hidden;
;`;

const Container = styled.div`
  height: 150px;
  width: 150px;
  position: relative;
  margin: 20px;
`;

const CardFront = styled.div`
  ${cardStyles};
  transform: ${p => (p.isSelected ? 'rotateY(0deg)' : 'rotateY(180deg)')};
`;

const CardBack = styled.div`
  ${cardStyles};
  transform: ${p => (p.isSelected ? 'rotateY(-180deg)' : 'rotateY(0deg)')};
`;

const CardBackImage = styled.img.attrs({ src: cardBackImage })`
  height: 135px;
  width: 135px;
`;

const CardFrontImage = styled.img`
  height: 120px;
  width: 120px;
`;

export default ({ image, isSelected, onClick }) => (
  <Container onClick={onClick}>
    <CardFront isSelected={isSelected}>
      <CardFrontImage src={image} />
    </CardFront>
    <CardBack isSelected={isSelected}>
      <CardBackImage />
    </CardBack>
  </Container>
);
