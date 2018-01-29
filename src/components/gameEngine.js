export const selectByIndex = (cards, index) => {
  const itemToSelect = cards[index];
  return [
    ...cards.slice(0, index),
    { ...itemToSelect, isSelected: true },
    ...cards.slice(index + 1, cards.length + 1)
  ];
};

export const markCorrect = (cards, correctName) => {
  return cards.reduce(
    (acc, curr) =>
      curr.name === correctName
        ? [...acc, { ...curr, isCorrect: true }]
        : [...acc, curr],
    []
  );
};

export const reset = cards =>
  cards.reduce(
    (acc, curr) => [...acc, { ...curr, isSelected: !!curr.isCorrect }],
    []
  );
