
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

var showDice = function() {
  for (var i = 0; i < diceInPlay.length; i++) {
    var id = '#die' + (i + 1);
    $(id).text(diceInPlay[i].toString())
  }
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
  showDice();
  diceInPlay = [];
});

$('.dice').on('click', function() {
  if (this.classList.contains('dice')) {
    this.classList.add('diceselect')
    this.classList.remove('dice');
  } else {
    this.classList.add('dice');
    this.classList.remove('diceselect');
  }
});
