import React from 'react';
import styled, { keyframes } from 'styled-components';
import { pulse, tada } from 'react-animations';
import cardBackImage from '../assets/cardback.png';

const pulseAnimation = keyframes`${pulse}`;
const tadaAnimation = keyframes`${tada}`;

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
  animation: ${p => {
    if (p.isSelected) {
      return `1s ${pulseAnimation}`;
    }
    return 'none';
  }};
  height: 150px;
  width: 150px;
  position: relative;
  margin: 20px;
`;

const CardFront = styled.div`
  ${cardStyles};
  animation: ${p => {
    if (p.isCorrect) {
      return `1s ${tadaAnimation}`;
    }
    return 'none';
  }};
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

export default ({ image, isSelected, onClick, isCorrect }) => (
  <Container onClick={onClick} isSelected={isSelected}>
    <CardFront isSelected={isSelected} isCorrect={isCorrect}>
      <CardFrontImage src={image} />
    </CardFront>
    <CardBack isSelected={isSelected}>
      <CardBackImage />
    </CardBack>
  </Container>
);
