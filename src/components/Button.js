import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  width: 300px;
  height: 60px;
  border: 5px solid white;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.25);
  margin-bottom: 60px;
  transition: all 0.2s;
  &:hover {
    transition: all 0.2s;
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.5);
  }
`;

const ButtonText = styled.div`
  font-size: 18px;
  font-family: monospace;
  color: white;
`;

export default ({ children, onClick }) => (
  <Button onClick={onClick}>
    <ButtonText>{children.toUpperCase()}</ButtonText>
  </Button>
);
