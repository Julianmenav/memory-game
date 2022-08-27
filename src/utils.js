const getCards = async (numberOfCards) => {
  let randomNumbers = [];
  let fetchResult = [];
  let numberOfPokemons = 151

  //Get X random numbers which refer to X random pokemons sprites
  while (randomNumbers.length < numberOfCards) {
    console.log("obteniendo un numerito")
    let randomNumber = Math.floor((Math.random() * numberOfPokemons)) + 1;
    if (!randomNumbers.includes(randomNumber)) {
      randomNumbers.push(randomNumber);
    }
  }
  //Fetch those numbers to get pokemon sprites.
  for (let randomNumber of randomNumbers) {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${randomNumber}`
    );
    const responseJson = await res.json();
    fetchResult.push(responseJson.sprites.front_default);
  }
  const cards = fetchResult.map((el, idx) => ({ id: idx, img: el }));
  return cards;
};


//Input: Array of objects. Output: 2 shuffle arrays of objects.
const shuffleCards = (cards) => {
  const length = cards.length;
  const duplicatedArray = [...cards, ...cards];
  const randomArray = [...duplicatedArray].sort(() => Math.random() - 0.5);

  return [randomArray.slice(0, length), randomArray.slice(length)];
};

export { getCards, shuffleCards };
