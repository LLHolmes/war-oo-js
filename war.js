// const cardList = [{ '2': 2 }, { '3': 3 }, { '4': 4 }, { '5': 5 }, { '6': 6 }, { '7': 7 }, { '8': 8 }, { '9': 9 }, { '10': 10 }, { 'Jack': 11 }, { 'Queen': 12 }, { 'King': 13 }, { 'Ace': 14 }];
const cardList = [{ '2': 2 }, { '3': 3 }, { '4': 4 }, { '5': 5 }];
const suitList = ['clubs', 'spades', 'hearts', 'diamonds'];


class Player {
  constructor(name) {
    this.name = name;
    this.pile = [];

    console.log(`${this.name} has entered the game.`);
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
      suitList.forEach(suit => {
        this.cards.push(new Card(Object.keys(card)[0], Object.values(card)[0], suit));
      });
    });

    console.log(`The cards are on the table.`);
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
    console.log(`**********`);
  };
};

class Hand {
  constructor() {
    this.playerOneCards = [playerOne.layCard()];
    this.playerTwoCards = [playerTwo.layCard()];
    this.currentPlayers = []
    this.verifyCards();
  };

  verifyCards() {
    console.log(`${playerOne.name} lays the ${this.playerOneCards[0].name} of ${this.playerOneCards[0].suit}.`);
    console.log(`${playerTwo.name} lays the ${this.playerTwoCards[0].name} of ${this.playerTwoCards[0].suit}.`);
    console.log(`----------`);
    this.playHand();
  };

  addCards() {
    this.playerOneCards.unshift(playerOne.layCard());
    this.playerTwoCards.unshift(playerTwo.layCard());
  };

  trickWinner(player) {
    player.winTrick([...this.playerOneCards, ...this.playerTwoCards]);
    console.log(`${player.name} wins the trick and adds ${this.playerOneCards.length * 2} cards to their pile of cards.`);
    console.log(`${playerOne.name} has ${playerOne.pile.length} cards in their pile while ${playerTwo.name} has ${playerTwo.pile.length} cards.`);
    console.log(`**********`);
  };

  playHand() {
    if(this.playerOneCards[0].points > this.playerTwoCards[0].points) {
      this.trickWinner(playerOne);
    } else if(this.playerOneCards[0].points < this.playerTwoCards[0].points) {
      this.trickWinner(playerTwo);
    // In the event of a tie:
    } else {
      // Check both players have enough cards to play full tie. If so, do.
      if(playerOne.pile.length >= 2 && playerTwo.pile.length >= 2){
        this.playTie();
        this.continuePlay();
      // If either only has one card left, lay facedown card and opponent wins.
      } else if((playerOne.pile.length === 1 || playerTwo.pile.length === 1)) {
        this.playTie();
        if(playerOne.pile.length === 0)  {
          console.log(`${playerOne.name} is out of cards.`);
          this.trickWinner(playerTwo);
        } else {
          console.log(`${playerTwo.name} is out of cards.`);
          this.trickWinner(playerOne);
        };
      // Otherwise, player with no cards remaining loses hand.
      } else {
        playerOne.pile.length === 0 ? this.trickWinner(playerTwo) : this.trickWinner(playerOne);
      };
    };
  };

  playTie() {
    this.addCards();
    console.log(`${playerOne.name} lays a card face down.`);
    console.log(`${playerTwo.name} lays a card face down.`);
    console.log(`----------`);
  };

  continuePlay() {
    this.addCards();
    this.verifyCards();
  };
};





// Game play:
console.log("The Game Of WAR!");
let playerOne = new Player('Player One');
let playerTwo = new Player('Player Two');
let deck = new Deck(cardList);

deck.deal([playerOne, playerTwo]);

while(playerOne.pile.length && playerTwo.pile.length) {
  let hand = new Hand();
};

playerOne.pile.length === 0 ? console.log(`${playerTwo.name.toUpperCase()} WINS THE GAME!`) : console.log(`${playerOne.name.toUpperCase()} WINS THE GAME!`);
