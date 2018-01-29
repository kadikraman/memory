import React, { Component } from 'react';
import styled from 'styled-components';
import Button from './components/Button';
import Game from './components/Game';
import backgroundImage from './assets/background.png';

const Page = styled.div`
  background-repeat: repeat-y;
  background-image: linear-gradient(
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0.2) 80%,
      rgba(0, 0, 0, 0.2)
    ),
    url(${backgroundImage});
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Buttons = styled.div`
  flex-direction: column;
`;

class App extends Component {
  state = { selectedGame: 'London' };

  selectGame = selectedGame => {
    this.setState({
      selectedGame
    });
  };

  render() {
    const { selectedGame } = this.state;
    return (
      <Page>
        {selectedGame ? (
          <Game type={selectedGame} onGoBack={() => this.selectGame(null)} />
        ) : (
          <Buttons>
            <Button onClick={() => this.selectGame('London')}>London</Button>
            <Button onClick={() => this.selectGame('Seattle')}>Seattle</Button>
          </Buttons>
        )}
      </Page>
    );
  }
}

export default App;
