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

const layCards = (players, cardsPlayed) => {
  // let cardsPlayed = [];
  if (cardsPlayed[0]) {
    for(let i = 0; i < players.length; i++) {
      cardsPlayed[i].cards.unshift(players[i].pile.shift());
      cardsPlayed[i].cards.unshift(players[i].pile.shift());
      console.log(`${players[i].name} lays the ${cardsPlayed[i].cards[0].name} of ${cardsPlayed[i].cards[0].suit}.`)
    };
  } else {
    for(let i = 0; i < players.length; i++) {
      cardsPlayed.push({ name: players[i].name, cards: [players[i].pile.shift()] });
      console.log(`${players[i].name} lays the ${cardsPlayed[i].cards[0].name} of ${cardsPlayed[i].cards[0].suit}.`)
    };
  };
  return cardsPlayed;
};

const playTie = (players, cardsPlayed) => {
  for(let i = 0; i < players.length; i++) {
    cardsPlayed[i].cards.unshift(players[i].pile.shift());
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

  // Needs to be adjusted for more than two players:
  // Started tinkering but cards[highest] = undefined
  //   let cards = {};
  //   for(let i = 0; i < layedCards.length; i++) {
  //     if (cards[layedCards[i].cards[0].points]) {
  //       cards[layedCards[i].cards[0].points] += 1
  //     } else {
  //       cards[layedCards[i].cards[0].points] = 1;
  //     };
  //   };
  // console.log(`winOrTie`)
  //   let orderedCards = Object.keys(cards).sort()
  //   // console.log(orderedCards[0])
  //   console.log(orderedCards)
  //   let highest = orderedCards.pop
  //   console.log(cards[highest])
  //   console.log({two: 1, five: 1})
  //   if (cards[highest] === 1){
  //     console.log(`1`)
  //   } else {
  //     console.log(`greater than 1`)
  //   }
  //   console.log(cards)
  //   return true
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

const filterPlayers = (players) => {
  // players.filter(player => (player if player.pile.length > 0))
  return players
}

const announceGameWinner = (players) => {
  // console.log(`${layedCards[0].name} wins the hand.`);
  for(let i = 0; i < players.length; i++) {
    console.log(`${players[i].name} has ${players[i].pile.length} cards in his pile.`);
  };
  console.log(`**********`);
};

// Game play:
console.log("The Game Of WAR!");
let deck = new Deck(cardList, suitList);
let shuffledDeck = shuffle(deck.cards);
let players = dealToPlayers(2, shuffledDeck); // [{ name: Player 1, pile: [] }...]  // Array of objects for each player with an array of Cards for pile
      // Should I change to [{ Player 1: [] }...]
let layedCards = [];
// while(checkPiles(players)) {
  layedCards = layCards(players, layedCards);
  console.log(layedCards[0].cards.length)
  if (winOrTie(layedCards)) {
    layedCards.sort((a, b) => b.cards[0].points > a.cards[0].points ? 1 : -1)
    winnerAddsCards(players, layedCards)
    announceHandWinner(players, layedCards)
  } else {
    while(!winOrTie(layedCards)) {
      console.log(`Tie!`)
      // if (checkPiles(players)) {
        layedCards = layCards(players, layedCards);
        console.log(layedCards[0].cards.length)
      // } else {
      //   players.filter
      // };
      // console.log(layedCards)
    };
  };
// };
console.log(`**********`);

console.log(`End of game`)
console.log(players)


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
