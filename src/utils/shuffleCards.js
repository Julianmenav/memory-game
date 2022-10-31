//Input: Array of objects. Output: 2 shuffle arrays of objects.
const shuffleCards = (cards) => {
  const duplicatedArray = [...cards, ...cards];
  const randomArray = [...duplicatedArray].sort(() => Math.random() - 0.5);

  return randomArray;
};

export default shuffleCards