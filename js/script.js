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
    diceButton = $('#rollbutton'),
    player1Turn = $('.player1.unplayed'),
    player2Turn = $('.player2.unplayed');
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

// Score Three of a Kind
var ofAKind = function(array) {
  var sorted = array.sort();
  for (var i = 0; i < array.length - 2; i++) {
    if ((sorted[i] === sorted[i + 1] && sorted[i + 1] === sorted[i + 2])) {
      return array.reduce(function(accumulator, value) {
        return accumulator + value;
      }, 0);
      break;
    } else {
      return 0;
    }
  };
};


// Score Small + Large Straight but WONT WORK WHY NOTTTTTTT

// Score Full House
var fullHouse = function(array) {
  var sorted = array.sort();
  if ((sorted[0] === sorted [1] && sorted[1] === sorted[2]) &&
      sorted[3] === sorted[4]) {
    return 25
  } else if (sorted[0] === sorted[1] && (sorted[2] === sorted[3] &&
      sorted[3] === sorted[4])) {
        return 25
    } else {
      return 0
    }
};

// Score Yahtzee
var yahtzee = function() {
  allDice = diceInHand.concat(diceInPlay);
  count = 0;
  score = 0;
  for (var i = 0; i < (allDice.length + 1); i++) {
    if (allDice.indexOf(i) === -1) {
      count++
    }
  }
  if (count >= 5) {
    score = 50;
  }
  return score
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
    $('.threekind').html(ofAKind(allDice));
    // $('.fourkind').html(ofAKind(allDice, 4));
    // $('.sstraight').html(straight(allDice));
    // $('.lstraight').html(straight(allDice));
    $('.fullhouse').html(fullHouse(allDice));
    $('.chance').html(allDice.reduce(function(accumulator, value) {
      return accumulator + value;
    }, 0));
    $('.yahtzee').html(yahtzee());
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

var switch2p2 = function() {
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
  player1Turn = $('.player1.unplayed');
  player2Turn = $('.player2.unplayed');
  rollNum = 0;
  diceInHand = [];
};

var switch2p1 = function() {
  $('.p2board').hide();
  $('.p1board').show();
  $('.dice').removeClass('rolled');
  $('.dice').removeClass('selected');
  $('.dice').addClass('unselected');
  $('.dice').css('background-image', '');
  this.className = 'saved';
  diceButton.removeClass('disabled');
  $('body').css('background-color', '#86BBD8');
  $('#player2title').hide();
  $('#player1title').show();
  $('.btn').html('ROLLS LEFT: 3');
  player1Turn = $('.player1.unplayed');
  player2Turn = $('.player2.unplayed');
  rollNum = 0;
  diceInHand = [];
};

// Turn End Events
player1Turn.on('click', function() {
  if (this.className === 'savedp1') {
  } else if (rollNum > 0) {
    var addScore = $(this).html()
    player1TotalScore += parseInt(addScore, 10);
    this.className = 'savedp1';
    $('.unplayed').html('');
    $('#rollbutton').addClass('disabled');
    setTimeout(switch2p2, 2000);
  }
});

player2Turn.on('click', function() {
  if (this.className === 'savedp2') {
  } else if (rollNum > 0) {
    var addScore = $(this).html()
    player2TotalScore += parseInt(addScore, 10);
    this.className = 'savedp2'
    $('.unplayed').html('');
    $('#rollbutton').addClass('disabled');
    setTimeout(switch2p1, 2000);
  }
})

$('#buttondiv').on('click', function() {
  $('.gameboard').show();
  $('.gameheader').show();
  $('.startpage').hide();
})


dice.on('click', function() {
  if (rollNum === 0) {
    return;
  } if ($(this).hasClass('unselected') && rollNum < 3) {
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
