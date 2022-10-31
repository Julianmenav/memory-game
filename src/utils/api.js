const getCards = async (numberOfCards) => {
  let randomNumbers = [];
  let fetchResult = [];
  let numberOfPokemons = 151

  //Get X random numbers which refer to X random pokemons sprites
  while (randomNumbers.length < numberOfCards) {
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

export default getCards;