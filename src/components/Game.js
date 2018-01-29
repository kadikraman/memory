import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import shuffle from 'lodash/shuffle';
import { rotateIn } from 'react-animations';
import Button from './Button';
import Card from './Card';
import londonPeeps from './londonPeeps';
import seattlePeeps from './seattlePeeps';
import { selectByIndex, markCorrect, reset } from './gameEngine';

const rotateInAnimation = keyframes`${rotateIn}`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const GameGrid = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 800px;
  margin-bottom: 20px;
  position: relative;
`;

const Time = styled.div`
  font-size: 72px;
  color: white;
  font-family: monospace;
`;

const YouWin = styled.div`
  animation: 1s ${rotateInAnimation};
  position: absolute;
  border: 1px solid #e95656;
  background-color: rgba(188, 46, 46, 0.8);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 100px 150px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  padding: 50px 0 20px 0;
`;

const WinningText = styled.div`
  font-size: 48px;
  color: white;
  font-family: monospace;
`;

const TimeText = styled.div`
  font-size: 18px;
  color: white;
  font-family: monospace;
`;

export default class Game extends Component {
  state = {
    isSolved: false,
    cards: [],
    currentSelection: [],
    timer: 0,
    isTimerRunning: false
  };

  getNewCards = () => {
    const { type } = this.props;

    if (type === 'London') {
      return shuffle([...londonPeeps, ...londonPeeps]);
    }

    const shuffled = shuffle(seattlePeeps);
    const picked = shuffled.splice(0, 6);
    return shuffle([...picked, ...picked]);
  };

  componentDidMount() {
    this.setState({
      cards: this.getNewCards(),
      isSolved: false
    });
  }

  restart = () => {
    this.setState({
      isSolved: false,
      cards: this.getNewCards(),
      currentSelection: [],
      timer: 0,
      isTimerRunning: false
    });
  };

  tick = () => {
    this.setState({
      timer: this.state.timer + 1
    });
  };

  timerLoop = () => {
    if (this.state.isTimerRunning) {
      setTimeout(() => {
        this.tick();
        this.timerLoop();
      }, 1000);
    }
  };

  startTimer = () => {
    this.setState(
      {
        isTimerRunning: true
      },
      () => this.timerLoop()
    );
  };

  handleSelect = index => {
    const { cards, currentSelection, isTimerRunning } = this.state;

    if (!isTimerRunning) {
      this.startTimer();
    }

    const itemToSelect = this.state.cards[index];

    const cardsWithSelection = selectByIndex(cards, index);

    // first selection
    if (currentSelection.length === 0) {
      this.setState({
        cards: cardsWithSelection,
        currentSelection: [itemToSelect.name]
      });
    } else if (currentSelection.length === 1) {
      if (currentSelection[0] === itemToSelect.name) {
        const newCards = markCorrect(cardsWithSelection, currentSelection[0]);
        const isSolved = newCards.filter(card => !card.isCorrect).length === 0;

        this.setState({
          cards: newCards,
          currentSelection: [...currentSelection, itemToSelect.name],
          isSolved,
          isTimerRunning: !isSolved
        });
      } else {
        this.setState({
          cards: cardsWithSelection,
          currentSelection: [...currentSelection, itemToSelect.name]
        });
      }
    } else {
      if (currentSelection[0] === currentSelection[1]) {
        this.setState({
          cards: cardsWithSelection,
          currentSelection: [itemToSelect.name]
        });
      } else {
        this.setState({
          cards: selectByIndex(reset(cards), index),
          currentSelection: [itemToSelect.name]
        });
      }
    }
  };

  render() {
    const { onGoBack } = this.props;
    const { isSolved, cards, timer } = this.state;

    const seconds = timer % 60;
    const minutes = Math.floor(timer / 60);

    return (
      <Container>
        <Time>{`${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10
          ? '0'
          : ''}${seconds}`}</Time>
        <GameGrid>
          {cards.map((person, index) => (
            <Card
              key={index}
              image={person.image}
              onClick={() => {
                if (!person.isSelected) {
                  this.handleSelect(index);
                }
              }}
              isSelected={person.isSelected}
              isCorrect={person.isCorrect}
            />
          ))}
          {isSolved ? (
            <YouWin>
              <WinningText>Yay, you win!</WinningText>
              <TimeText>
                Time: {minutes} minutes and {seconds} seconds
              </TimeText>
              <Button onClick={this.restart}>Play again!</Button>
            </YouWin>
          ) : null}
        </GameGrid>
        <Button onClick={onGoBack}>Main menu</Button>
      </Container>
    );
  }
}
