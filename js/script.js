console.log('this is working');

var player1 = true,
    player2 = false,
    cup = [],
    diceInPlay = [],
    dieInHand = [],
    die1 = 0,
    die2 = 0,
    die3 = 0,
    die4 = 0,
    die5 = 0;

var rollDie = function() {
  return Math.floor(Math.random() * 6 + 1);
};

var firstRoll = function() {
  die1 = rollDie();
  diceInPlay.push(die1);
  die2 = rollDie();
  diceInPlay.push(die2);
  die3 = rollDie();
  diceInPlay.push(die3);
  die4 = rollDie();
  diceInPlay.push(die4);
  die5 = rollDie();
  diceInPlay.push(die5);
};

$('#rollbutton').on('click', function() {
  firstRoll();
});
