// Player Variables
var player1 = true,
    player2 = false,
    player1Score = 0,
    player2Score = 0;
// Dice-specific Variables
var dice = $('.dice'),
    diceInPlay = [],
    diceInHand = [],
    allDice = [],
    rollNum = 0,
    die = 0,
    diceSum = 0,
    diceButton = $('#rollbutton');
// Global Constants + Colors
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
    var j = i + 1;
    var id = '#die' + j;
    dice[i].classList.add('rolled');
    dice[i].setAttribute('data-value', diceInPlay[i]);
    dice[i].style.backgroundImage = "url('css/img/" + diceInPlay[i] + ".png')";
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

// Score the left side of the board
var leftScores = function(array, dieNum) {
  var count = 0;
  for (var i = 0; i < array.length; i++) {
    if (array[i] === dieNum) {
      count++
    }
  }
  return count * dieNum;
};

// Show all potential scoring options
var potentialScore = function() {
  if (diceInPlay.length !== 0 && diceInHand.length === 0) {
    diceSum = diceInPlay.reduce(function(total, amount) {
      return total + amount
    });
    $('.unplayed').html(diceSum);
  } else if (diceInPlay.length !== 0 || diceInHand.length !== 0) {
      allDice = diceInHand.concat(diceInPlay);
      diceSum = allDice.reduce(function(total, amount) {
        return total + amount
      });
      $('.unplayed').html(diceSum);
    }
  };


// Game Turn Function
diceButton.on('click', function() {
  if (rollNum < 3) {
    clearTable();
    diceInPlay = [];
    rollDice();
    showRoll();
    potentialScore();
    resetDice();
    saveDice();
    rollNum++
  }
});

dice.on('click', function() {
  if (this.classList.contains('dice') && diceInPlay.length !== 0) {
    this.classList.add('diceselect');
    this.classList.remove('dice');
    var value = this.getAttribute('data-value');
    this.style.backgroundImage = "url('css/img/" + value + value + ".png')";
    // var int = $(this).html();
    // diceInHand.push(parseInt(int, 10));
  } else {
    this.classList.add('dice');
    this.classList.remove('diceselect')
    var int = $(this).html();
    diceInHand.splice(diceInHand.indexOf(parseInt(int, 10)), 1);
  }
});
