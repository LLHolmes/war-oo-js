const cardList = [{ '2': 2 }, { '3': 3 }, { '4': 4 }, { '5': 5 }, { '6': 6 }, { '7': 7 }, { '8': 8 }, { '9': 9 }, { '10': 10 }, { 'Jack': 11 }, { 'Queen': 12 }, { 'King': 13 }, { 'Ace': 14 }];

class Player {
  constructor(name) {
    this.name = name;
    this.pile = [];

    console.log(`${this.name} has entered the game.`)
  };

  // CAN LAY A CARD

  // CAN ACCEPT A TRICK
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

    console.log(`The cards are on the table.`)
  };

  shuffle() {
    let d = this.cards.length;
    let i;

    while (d) {
      i = Math.floor(Math.random() * d--);
      this.shuffledCards.push(this.cards.splice(i, 1)[0]);
    };
  };

  deal(players) {
    this.shuffle();
    let d = this.shuffledCards.length;
    while(d) {
      players[0].pile.push(this.shuffledCards.shift());
      --d;
      players[1].pile.push(this.shuffledCards.shift());
      --d;
    };
    console.log("The cards have been shuffled and dealt.");
    console.log("Let's begin!");
  };
};

// #### Hands Class
//   - Has PlayerOneCards - Array of Cards
//   - Has PlayerTwoCards - Array of Cards
//   - Can verify points of Cards
//   - Can play hand - verify points of Cards
//   - Can play tie - accept facedown Cards, then accept cards and verify points again upon a tie
//   - Can give cards to player when trick is won





// Game play:
console.log("The Game Of WAR!")
let playerOne = new Player('Player One')
let playerTwo = new Player('Player Two')
let deck = new Deck(cardList)

deck.deal([playerOne, playerTwo])


//   - Loop through game:
//     - verify both Players have Cards
//     - start a Hand ???
