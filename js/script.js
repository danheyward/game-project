// Player Variables
var player1 = true,
    player2 = false,
    player1LeftScore = 0,
    player2LeftScore = 0,
    player1TotalScore = 0,
    player2TotalScore = 0;
// Dice-specific Variables
var dice = $('.dice'),
    unselected = $('.unselected'),
    selected = $('.selected'),
    diceInPlay = [],
    diceInHand = [],
    allDice = diceInHand.concat(diceInPlay),
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
    unselected = $('.unselected');
    unselected[i].classList.add('rolled');
    unselected[i].setAttribute('data-value', diceInPlay[i]);
    unselected[i].style.backgroundImage = "url('css/img/" + diceInPlay[i] + diceInPlay[i] + ".png')";
  }
};

// Adds up all values of the array
var sumArray = function() {
  allDice = diceInHand.concat(diceInPlay);
  sum = 0;
  for (var i = 0; i < allDice.length; i++) {
    sum += numbers[i]
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

// Score Three, Four and yahtzee
var searchArray = function(num) {
  return function(num2) {
    return num2 === num1;
  }
};

var ofAKind = function() {
  allDice = diceInHand.concat(diceInPlay);
  for (var i = 0; i > allDice; i++) {
    var result = allDice.filter(searchArray(i).length);
    if (result > 4) {
      sumArray();
    } else if (result > 3) {
      sumArray();
    } else if (result > 2) {
      sumArray();
    }
  }
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
    $('.threekind').html(ofAKind());
    $('.fourkind').html(ofAKind());
    $('.yahtzee').html(ofAKind());
  };


// Game Turn Function
diceButton.on('click', function() {
  $('#rolleddiv').show();
  if (rollNum < 2) {
    diceInPlay = [];
    rollDice();
    showRoll();
    potentialScore();
    $('.btn').html('ROLLS LEFT: ' + (2 - rollNum));
    rollNum++
  } else if (rollNum = 2) {
    diceInPlay = [];
    rollDice();
    showRoll();
    potentialScore();
    rollNum++
    $('.btn').html('Place Your Score!');
    $(this).addClass('disabled');
  }
});

// Turn End Events
$('.player1').on('click', function() {
  if (rollNum > 0) {
    $('.p1board').hide();
    $('.p2board').show();
    $('.dice').removeClass('rolled');
    $('.dice').removeClass('selected');
    $('.dice').addClass('unselected');
    $('.dice').css('background-image', '');
    diceButton.removeClass('disabled');
    $('body').css('background-color', '#F26419');
    $('#player1title').hide();
    $('#player2title').show();
    $('.btn').html('ROLLS LEFT: 3');
    rollNum = 0;
    diceInHand = [];
  }
});

$('.player2').on('click', function() {
  if (rollNum > 0) {
    $('.p2board').hide();
    $('.p1board').show();
    $('.dice').removeClass('rolled');
    $('.dice').removeClass('selected');
    $('.dice').addClass('unselected');
    $('.dice').css('background-image', '');
    diceButton.removeClass('disabled');
    $('body').css('background-color', '#86BBD8');
    $('#player2title').hide();
    $('#player1title').show();
    $('.btn').html('ROLLS LEFT: 3');
    rollNum = 0;
    diceInHand = [];
  }
})

$('#buttondiv').on('click', function() {
  $('.gameboard').show();
  $('.gameheader').show();
  $('.startpage').hide();
})


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
