import React, { Component } from 'react';
import styled from 'styled-components';
import shuffle from 'lodash/shuffle';
import Button from './Button';
import Card from './Card';
import londonPeeps from './londonPeeps';
import { selectByIndex, markCorrect, reset } from './gameEngine';

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
`;

const Time = styled.div`
  font-size: 72px;
  color: white;
  font-family: monospace;
`;

export default class Game extends Component {
  state = {
    isSolved: false,
    cards: [],
    currentSelection: [],
    timer: 0
  };

  componentDidMount() {
    this.setState({
      cards: shuffle([...londonPeeps, ...londonPeeps]),
      isSolved: false
    });
  }

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

    return (
      <Container>
        <Time>{`${Math.floor(timer / 60)}:${timer % 60}`}</Time>
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
            />
          ))}
        </GameGrid>
        <Button onClick={onGoBack}>Main menu</Button>
      </Container>
    );
  }
}
