const getCards = async (numberOfCards) => {
  let result = [];
  for (let i = 0; i < numberOfCards; i++) {
    const randomNumber = Math.floor(Math.random() * 800);
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${randomNumber}`
    );
    const responseJson = await res.json();
    result.push(responseJson.sprites.front_default);
  }
  return result.map((el, idx) => ({ id: idx, img: el }));
};

//In: Array of objects. Out: 2 shuffle arrays of objects.
const shuffleCards = (cards) => {
  const length = cards.length
  const duplicatedArray = [...cards,...cards]
  const randomArray = [...duplicatedArray].sort(() => Math.random() - 0.5)

  return [randomArray.slice(0, length), randomArray.slice(length)]
}








export { getCards, shuffleCards };
