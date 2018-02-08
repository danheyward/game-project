
var player1 = true,
    player2 = false,
    button = $('#rollbutton'),
    dice = $('.dice'),
    diceInPlay = [],
    diceInHand = [],
    die1 = 0,
    die2 = 0,
    die3 = 0,
    die4 = 0,
    die5 = 0;

var rollDie = function() {
  return Math.floor(Math.random() * 6 + 1);
};

var showRoll = function() {
  for (var i = 0; i < diceInPlay.length; i++) {
    var id = '#die' + (i + 1);
    $(id).text(diceInPlay[i].toString())
  }
};

var showHand = function() {
  for (var i = 0; i < diceInHand.length; i++) {
    var id = '#held' + (i + 1);
    $(id).text(diceInHand[i].toString())
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


var resetDice = function() {
  for (var i = 0; i < dice.length; i++) {
    if (dice[i].className === 'diceselect') {
    dice[i].classList.remove('diceselect');
    dice[i].classList.add('dice');
    };
  };
};

button.on('click', function() {
  firstRoll();
  showRoll();
  resetDice();
  showHand();
  diceInPlay = [];
});

dice.on('click', function() {
  if (this.classList.contains('dice') && $(this).text() !== '') {
    this.classList.add('diceselect')
    this.classList.remove('dice')
    diceInHand.push($(this).text())
  } else {
    this.classList.add('dice');
    this.classList.remove('diceselect')
    diceInHand.splice(diceInHand.indexOf($(this).text()), 1);
  }
});
