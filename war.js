console.log("The Game Of WAR!")

const cardList = [{ '2': 2 }, { '3': 3 }, { '4': 4 }, { '5': 5 }, { '6': 6 }, { '7': 7 }, { '8': 8 }, { '9': 9 }, { '10': 10 }, { 'Jack': 11 }, { 'Queen': 12 }, { 'King': 13 }, { 'Ace': 14 }];

class Card {
  constructor(name, points, suit) {
    this.name = name;
    this.points = points;
    this.suit = suit;
  };
};

class Deck {
  constructor(cardList) {
    this.cards = [];
    cardList.forEach(card => {
      this.cards.push(new Card(Object.keys(card)[0], Object.values(card)[0], 'clubs'));
      this.cards.push(new Card(Object.keys(card)[0], Object.values(card)[0], 'spades'));
      this.cards.push(new Card(Object.keys(card)[0], Object.values(card)[0], 'hearts'));
      this.cards.push(new Card(Object.keys(card)[0], Object.values(card)[0], 'diamonds'));
    });
  };
};





// Game play:
let deck = new Deck(cardList)
