console.log("The Game Of WAR!")

const cardList = [{ '2': 2 }, { '3': 3 }, { '4': 4 }, { '5': 5 }, { '6': 6 }, { '7': 7 }, { '8': 8 }, { '9': 9 }, { '10': 10 }, { 'Jack': 11 }, { 'Queen': 12 }, { 'King': 13 }, { 'Ace': 14 }];

let deck = [];

class Card {
  constructor(name, points, suit) {
    this.name = name;
    this.points = points;
    this.suit = suit;

    deck.push(this);
  };
};

const buildDeck = (cardList) => {
  cardList.forEach(card => {
    let clubs = new Card(Object.keys(card)[0], Object.values(card)[0], 'clubs');
    let spades = new Card(Object.keys(card)[0], Object.values(card)[0], 'spades');
    let hearts = new Card(Object.keys(card)[0], Object.values(card)[0], 'hearts');
    let diamonds = new Card(Object.keys(card)[0], Object.values(card)[0], 'diamonds');
  });
};

buildDeck(cardList)
