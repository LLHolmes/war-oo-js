// const cardList = [{ '2': 2 }, { '3': 3 }, { '4': 4 }, { '5': 5 }, { '6': 6 }, { '7': 7 }, { '8': 8 }, { '9': 9 }, { '10': 10 }, { 'Jack': 11 }, { 'Queen': 12 }, { 'King': 13 }, { 'Ace': 14 }];
const cardList = [{ '2': 2 }, { '3': 3 }, { '4': 4 }, { '5': 5 }];
const suitList = ['clubs', 'spades', 'hearts', 'diamonds'];

class Card {
  constructor(name, points, suit) {
    this.name = name;
    this.points = points;
    this.suit = suit;
  };
};

class Deck {
  constructor(cards, suits) {
    this.cards = [];
    cards.forEach(card => {
      suits.forEach(suit => {
        this.cards.push(new Card(Object.keys(card)[0], Object.values(card)[0], suit));
      });
    });
    console.log(`The cards are on the table.`)
  };
};

const shuffle = (cards) => {
  if (cards.length === 1) {
    console.log(`The cards have been shuffled.`)
    return cards;
  };

  let i = Math.floor(Math.random() * cards.length);
  let remainingCards = [...cards.slice(0, i), ...cards.slice(i + 1)];
  return [cards[i], ...shuffle(remainingCards)];
};

const dealToPlayers = (numberOfPlayers, cards) => {
  let players = [];
  for (let x = 1; x <= numberOfPlayers; x++) {
    players.push({name: `Player ${x}`, pile: []});
    console.log(`Player ${x} has entered the game.`);
  };

  let d = cards.length;
  while(d) {
    players.forEach(player => {
      player.pile.push(cards.shift());
      --d;
    });
  };

  console.log(`The cards have been dealt.`)
  console.log(`Let's begin!`);
  console.log(`**********`);

  return players;
};

const checkPiles = (players) => {
  for (let i = 0; i < players.length; i++) {
    if (players[i].pile.length === 0) {
      return false;
    };
  };
  return true
};

const layCards = (players) => {

};

const findWinner = () => {

};

const winnerAddsCards = (players) => {

};

const announceWinner = () => {

};

// Game play:
console.log("The Game Of WAR!");
let deck = new Deck(cardList, suitList);
let shuffledDeck = shuffle(deck.cards);
let players = dealToPlayers(2, shuffledDeck); // [{ player: 1, pile: [] }...]  // Array of objects for each player with an array of Cards for pile

checkPiles(players);


// If both players have cards in their pile:            checkPiles
//   Players lay card.                                  layCards
//   If one card is higher, that player wins hand.      findWinner
//   If not:
//     players lay a blind card.                        layCards
//     players lay another card.                        layCards
//     if one card is higher, that player wins hand.    findWinner
//     if not, repeat...
//   Winning player collects cards.                     winnerAddsCards
// If not, player with cards in pile wins game.         announceWinner
