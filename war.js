const cardList = [{ '2': 2 }, { '3': 3 }, { '4': 4 }, { '5': 5 }, { '6': 6 }, { '7': 7 }, { '8': 8 }, { '9': 9 }, { '10': 10 }, { 'Jack': 11 }, { 'Queen': 12 }, { 'King': 13 }, { 'Ace': 14 }];

class Player {
  constructor(name) {
    this.name = name;
    this.pile = [];

    console.log(`${this.name} has entered the game.`)
  };

  layCard() {
    return this.pile.shift();
  };

  winTrick(cards) {
    this.pile.push(...cards);
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
//   - Can verify points of Cards
//   - Can play hand - verify points of Cards
//   - Can play tie - accept facedown Cards, then accept cards and verify points again upon a tie
//   - Can give cards to player when trick is won
// console.log(`${this.name} adds ${cards.length} cards to their pile.`)

class Hand {
  constructor() {
    this.playerOneCards = [playerOne.layCard()];
    this.playerTwoCards = [playerTwo.layCard()];

    this.listCards();
    this.playHand();
  };

  listCards() {
    console.log(`${playerOne.name} lays the ${this.playerOneCards[0].name} of ${this.playerOneCards[0].suit}.`);
    console.log(`${playerTwo.name} lays the ${this.playerTwoCards[0].name} of ${this.playerTwoCards[0].suit}.`);
    console.log(`**********`)
  };

  trickWinner(player) {
    player.winTrick([...this.playerOneCards, ...this.playerTwoCards])
    console.log(`${player.name} wins the trick and adds ${this.playerOneCards.length * 2} cards to their pile of cards.`);
    console.log(`${playerOne.name} has ${playerOne.pile.length} cards in their pile while ${playerTwo.name} has ${playerTwo.pile.length} cards.`);
  };

  playHand() {
    if(this.playerOneCards[0].points > this.playerTwoCards[0].points) {
      this.trickWinner(playerOne);
    } else if(this.playerOneCards[0].points < this.playerTwoCards[0].points) {
      this.trickWinner(playerTwo);
    } else {
      console.log("tie");
    };
  };

};





// Game play:
console.log("The Game Of WAR!")
let playerOne = new Player('Player One')
let playerTwo = new Player('Player Two')
let deck = new Deck(cardList)

deck.deal([playerOne, playerTwo])

let hand = new Hand()


//   - Loop through game:
//     - verify both Players have Cards
//     - start a Hand ???
