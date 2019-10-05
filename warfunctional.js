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

const countPilesTie = (players) => {
  let lowestCount = 52;
  for (let i = 0; i < players.length; i++) {
    if (players[i].pile.length < lowestCount) {
      lowestCount = players[i].pile.length
    };
  };
  return lowestCount
};

const announceEmptyPile = (players) => {
  for (let i = 0; i < players.length; i++) {
    if (players[i].pile.length === 0) {
      console.log(`${players[i].name} has run out of cards.`)
    };
  };
};

const startHand = (players) => {
  let cardsPlayed = [];
  for(let i = 0; i < players.length; i++) {
    cardsPlayed.push({ name: players[i].name, cards: [players[i].pile.shift()] });
    console.log(`${players[i].name} lays the ${cardsPlayed[i].cards[0].name} of ${cardsPlayed[i].cards[0].suit}.`);
  };
  return cardsPlayed;
};

const playTie = (players, cardsPlayed) => {
  // Needs to be adjusted for more than two players
  while(cardsPlayed[0].cards[0].points === cardsPlayed[1].cards[0].points) {
    if (countPilesTie(players) > 2) {
      for(let i = 0; i < players.length; i++) {
        cardsPlayed[i].cards.unshift(players[i].pile.shift());
        cardsPlayed[i].cards.unshift(players[i].pile.shift());
        console.log(`${players[i].name} lays a blind card and the ${cardsPlayed[i].cards[0].name} of ${cardsPlayed[i].cards[0].suit}.`);
      };
    } else if (countPilesTie(players) === 1) {
      for(let i = 0; i < players.length; i++) {
        cardsPlayed[i].cards.unshift(players[i].pile.shift());
        console.log(`${players[i].name} lays a blind card and has ${players[i].pile.length} cards in his pile.`);
        announceEmptyPile(players)
      };
      break;
    } else if (countPilesTie(players) === 0) {
      announceEmptyPile(players)
      break;
    };
  };
  return cardsPlayed;
};

const winOrTie = (layedCards) => {
  let cards = {};
  for(let i = 0; i < layedCards.length; i++) {
    if (cards[layedCards[i].cards[0].points]) {
      return false;
    } else {
      cards[layedCards[i].cards[0].points] = 1;
    };
  };
  return true

  // Needs to be adjusted for more than two players
};

const winnerAddsCards = (players, layedCards) => {
  let winner = players.find(player => player.name === layedCards[0].name);
  for(let i = 0; i < layedCards.length; i++) {
    winner.pile.push(...layedCards[i].cards);
  };
};

const announceHandWinner = (players, layedCards) => {
  console.log(`${layedCards[0].name} wins the hand.`);
  for(let i = 0; i < players.length; i++) {
    console.log(`${players[i].name} has ${players[i].pile.length} cards in his pile.`);
  };
  console.log(`**********`);
};

// Game play:
console.log("The Game Of WAR!");
let deck = new Deck(cardList, suitList);
let shuffledDeck = shuffle(deck.cards);
let players = dealToPlayers(2, shuffledDeck);

while(checkPiles(players)) {
  let layedCards = startHand(players);
  if (winOrTie(layedCards)) {
    layedCards.sort((a, b) => b.cards[0].points > a.cards[0].points ? 1 : -1)
    winnerAddsCards(players, layedCards)
    announceHandWinner(players, layedCards)
  } else {
    console.log(`Tie!`)
    layedCards = playTie(players, layedCards);
    winnerAddsCards(players, layedCards)
    announceHandWinner(players, layedCards)
  };
};

console.log(`**********`);
let winner = players.find(player => player.pile.length > 0)
console.log(`End of game`)
console.log(`${winner.name.toUpperCase()} WINS!`)
