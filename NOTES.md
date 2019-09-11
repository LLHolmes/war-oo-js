# Game of War

### Objects & methods needed:

#### Cards
  - Has a Name - String
  - Has a Suit - String
  - Has Points - Integer
  - Has Facedown - Boolean ???

#### Deck
  - Has cards - Array of Cards
  - Has shuffledCards - Array of Cards after shuffling
  - Can shuffle cards
  - Can deal Cards

#### Player
  - Has a Name - String  
  - Has a Pile - Array of Cards
  - Can lay a card
  - Can accept a trick when won

#### Hands
  - Has PlayerOneCards - Array of Cards
  - Has PlayerTwoCards - Array of Cards
  - Can verify points of Cards
  - Can play hand - verify points of Cards
  - Can play tie - accept facedown Cards, then accept cards and verify points again upon a tie
  - Can give cards to player when trick is won

#### Game play
  - Create players
  - Create Deck (which creates Cards)
  - Shuffle Deck
  - Deal Deck
  - Loop through game:
    - verify both Players have Cards
    - start a Hand ???
