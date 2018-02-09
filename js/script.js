// Player Variables
var player1 = true,
    player2 = false,
    player1Score = 0,
    player2Score = 0;
// Dice-specific Variables
var dice = $('.dice'),
    diceInPlay = [],
    diceInHand = [],
    rollNum = 0,
    die = 0,
    button = $('#rollbutton');
// Global Constants
var fullHand = 5;

//Dice Functions
var rollDie = function() {
  return Math.floor(Math.random() * 6 + 1);
};

var rollDice = function() {
  for (var i = 5; i > diceInHand.length; i--) {
    die = rollDie();
    diceInPlay.push(die);
  }
};

var showRoll = function() {
  for (var i = 0; i < diceInPlay.length; i++) {
    var id = '#die' + (i + 1);
    $(id).html(diceInPlay[i]);
  }
};

var saveDice = function() {
  for (var i = 0; i < diceInHand.length; i++) {
    var id = '#held' + (i + 1);
    $(id).html(diceInHand[i]);
  }
};

var resetDice = function() {
  for (var i = 0; i < dice.length; i++) {
    if (dice[i].className === 'diceselect') {
    dice[i].classList.remove('diceselect');
    dice[i].classList.add('dice');
    };
  };
};

var clearTable = function() {
  for (var i = 0; i < fullHand; i++) {
    var id = '#die' + (i + 1);
    $(id).html('');
  };
};


// Click Events
button.on('click', function() {
  if (rollNum < 3) {
    clearTable();
    diceInPlay = [];
    rollDice();
    showRoll();
    resetDice();
    saveDice();
    rollNum++
  }
});

dice.on('click', function() {
  if (this.classList.contains('dice') && $(this).html() !== '') {
    this.classList.add('diceselect')
    this.classList.remove('dice')
    diceInHand.push($(this).html())
  } else {
    this.classList.add('dice');
    this.classList.remove('diceselect')
    diceInHand.splice(diceInHand.indexOf($(this).html()), 1);
  }
});
