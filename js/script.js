// Player Variables
var player1 = true,
    player2 = false,
    player1Score = 0,
    player2Score = 0;
// Dice-specific Variables
var dice = $('.dice'),
    unselected = $('.unselected'),
    selected = $('.selected'),
    diceInPlay = [],
    diceInHand = [],
    allDice = [],
    rollNum = 0,
    die = 0,
    diceSum = 0,
    diceButton = $('.btn');
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
    unselected = $('.unselected');
    unselected[i].classList.add('rolled');
    unselected[i].setAttribute('data-value', diceInPlay[i]);
    unselected[i].style.backgroundImage = "url('css/img/" + diceInPlay[i] + diceInPlay[i] + ".png')";
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
  allDice = diceInHand.concat(diceInPlay);
  $('.ones').html(leftScores(allDice, 1));
  $('.twos').html(leftScores(allDice, 2));
  $('.threes').html(leftScores(allDice, 3));
  $('.fours').html(leftScores(allDice, 4));
  $('.fives').html(leftScores(allDice, 5));
  $('.sixes').html(leftScores(allDice, 6));
  };


// Game Turn Function
diceButton.on('click', function() {
  if (rollNum < 2) {
    diceInPlay = [];
    rollDice();
    showRoll();
    potentialScore();
    rollNum++
  } else if (rollNum = 2) {
    diceInPlay = [];
    rollDice();
    showRoll();
    potentialScore();
    rollNum++
    $(this).addClass('disabled');
  }
});

dice.on('click', function() {
  if ($(this).hasClass('unselected') && rollNum < 3) {
    $(this).addClass('selected');
    $(this).removeClass('unselected');
    var value = $(this).attr('data-value');
    $(this).css('background-image', "url('css/img/" + value + ".png')");
    var index = parseInt(value, 10);
    diceInHand.push(index);
    diceInPlay.splice(diceInPlay.indexOf(index), 1);
  } else if ($(this).hasClass('selected') && rollNum < 3) {
    $(this).addClass('unselected');
    $(this).removeClass('selected');
    var value = $(this).attr('data-value');
    $(this).css('background-image', "url('css/img/" + value + value + ".png')");
    var index = parseInt(value, 10);
    diceInPlay.push(index);
    diceInHand.splice(diceInHand.indexOf(index), 1);
  }
});
