// Player Variables
var player1 = true,
    player2 = false,
    player1Score = 0,
    player2Score = 0;
// Dice-specific Variables
var dice = $('.dice'),
    selected = $('.selected'),
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
    dice = $('.dice');
    dice[i].classList.add('rolled');
    dice[i].setAttribute('data-value', diceInPlay[i]);
    dice[i].style.backgroundImage = "url('css/img/" + diceInPlay[i] + diceInPlay[i] + ".png')";
  }
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
    diceInPlay = [];
    rollDice();
    showRoll();
    potentialScore();
    rollNum++
  }
});

dice.on('click', function() {
  if (diceInPlay.length !== 0) {
    this.classList.add('selected');
    this.classList.remove('dice');
    var value = this.getAttribute('data-value');
    this.style.backgroundImage = "url('css/img/" + value + ".png')";
    var index = parseInt(value, 10);
    diceInHand.push(index);
    diceInPlay.splice(diceInPlay.indexOf(index), 1);
  }
});

// selected.on('click,' function() {
//   if (this.classList.contains('selected'))
// })
