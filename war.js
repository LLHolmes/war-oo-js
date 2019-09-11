console.log("The Game Of WAR!")

const cardList = [{ '2': 2 }, { '3': 3 }, { '4': 4 }, { '5': 5 }, { '6': 6 }, { '7': 7 }, { '8': 8 }, { '9': 9 }, { '10': 10 }, { 'Jack': 11 }, { 'Queen': 12 }, { 'King': 13 }, { 'Ace': 14 }];

class Player {
  constructor(name) {
    this.name = name;
    this.pile = [];
  };
};

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
    this.shuffledCards = [];
    cardList.forEach(card => {
      this.cards.push(new Card(Object.keys(card)[0], Object.values(card)[0], 'clubs'));
      this.cards.push(new Card(Object.keys(card)[0], Object.values(card)[0], 'spades'));
      this.cards.push(new Card(Object.keys(card)[0], Object.values(card)[0], 'hearts'));
      this.cards.push(new Card(Object.keys(card)[0], Object.values(card)[0], 'diamonds'));
    });
  };

  shuffle() {
    let d = this.cards.length;
    let i;

    while (d) {
      i = Math.floor(Math.random() * d--);
      this.shuffledCards.push(this.cards.splice(i, 1)[0]);
    };
  };
};





// Game play:
let playerOne = new Player('Player One')
let playerTwo = new Player('Player Two')
let deck = new Deck(cardList)

deck.shuffle()
