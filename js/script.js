// Player Variables
var player1 = true,
    player2 = false,
    player1TotalScore = 0,
    player2TotalScore = 0;
    turnCount = 0;
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
    player2Turn = $('.player2.unplayed'),
    bonus = 35,
    nil = 0,
    player1Bonus = [],
    player2Bonus = [];
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

var leftBonus = function(array) {
  var sum = array.reduce(function(accumulator, value) {
    return accumulator + value;
  }, 0);
  console.log('this is the leftBonus: ', sum)
  if (sum >= 63) {
    return 35;
  } else {
    return 0
  }
};

// Score Three of a Kind
var threeOfAKind = function(array) {
  var sorted = array.sort();
  var sum = array.reduce(function(accumulator, value) {
    return accumulator + value;
  }, 0);
  if ((sorted[0] === sorted[1] && sorted[1] === sorted[2]) ||
      (sorted[1] === sorted[2] && sorted[2] === sorted[3]) ||
      (sorted[2] === sorted[3] && sorted[3] === sorted[4])) {
    return sum;
  } else {
    return 0
  }
};



// Score Three of a Kind
var fourOfAKind = function(array) {
  var sorted = array.sort();
  var sum = array.reduce(function(accumulator, value) {
    return accumulator + value;
  }, 0);
  if ((sorted[0] === sorted[1] && sorted[1] === sorted[2]
      && sorted[2] === sorted[3]) ||
      (sorted[1] === sorted[2] && sorted[2] === sorted[3]
      && sorted[3] === sorted[4])) {
    return sum;
  } else {
    return 0
  }
};


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

// Score Small Straight
var sStraight = function(array) {
  if ((array.indexOf(1) !== -1) && (array.indexOf(2) !== -1) &&
      (array.indexOf(3) !== -1) && (array.indexOf(4) !== -1)) {
    return 30
  } else if ((array.indexOf(2) !== -1) && (array.indexOf(3) !== -1) &&
      (array.indexOf(4) !== -1) && (array.indexOf(5) !== -1)) {
    return 30
  } else if ((array.indexOf(3) !== -1) && (array.indexOf(4) !== -1) &&
      (array.indexOf(5) !== -1) && (array.indexOf(6) !== -1)) {
    return 30
  } else {
    return 0
  }
};

// Score Large Straight
var lStraight = function(array) {
  var sorted = array.sort();
  if ((sorted[0] === (sorted[1] - 1)) && (sorted[1] === (sorted[2] - 1)) &&
      (sorted[2] === (sorted[3] - 1)) && (sorted[3] === (sorted[4] - 1))) {
        return 40
  } else {
    return 0
  };
};

// Score Yahtzee
var yahtzee = function(array) {
  if ((array[0] === array[1]) && (array[1] === array[2]) &&
      (array[2] === array[3]) && (array[3] === array[4])) {
        return 50;
      } else {
        return 0;
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
    $('#bonustotalplayer1').html(leftBonus(player1Bonus));
    // $('#bonustotalplayer1').html();
    $('.threekind').html(threeOfAKind(allDice));
    $('.fourkind').html(fourOfAKind(allDice));
    $('.sstraight').html(sStraight(allDice));
    $('.lstraight').html(lStraight(allDice));
    $('.fullhouse').html(fullHouse(allDice));
    $('.chance').html(allDice.reduce(function(accumulator, value) {
      return accumulator + value;
    }, 0));
    $('.yahtzee').html(yahtzee(allDice));
  };

// Check to see if Bonus condition is met


// Game Turn Function
diceButton.on('click', function() {
  $('#rolleddiv').show();
  if (rollNum < 2) {
    diceInPlay = [];
    rollDice();
    showRoll();
    potentialScore();
    $('#rollbutton').html('ROLLS LEFT: ' + (2 - rollNum));
    rollNum++
  } else if (rollNum = 2) {
    diceInPlay = [];
    rollDice();
    showRoll();
    potentialScore();
    rollNum++
    $('#rollbutton').html('Place Your Score!');
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
  $('#rollbutton').html('ROLLS LEFT: 3');
  player1Turn = $('.player1.unplayed');
  player2Turn = $('.player2.unplayed');
  rollNum = 0;
  diceInHand = [];
  diceInPlay = [];
  allDice = diceInHand.concat(diceInPlay);
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
  $('#rollbutton').html('ROLLS LEFT: 3');
  player1Turn = $('.player1.unplayed');
  player2Turn = $('.player2.unplayed');
  rollNum = 0;
  diceInHand = [];
  diceInPlay = [];
  allDice = diceInHand.concat(diceInPlay);
};

var pickWinner = function() {
  if (player1TotalScore > player2TotalScore) {
    $('.gameover').html("<h1 class='scores'>Winner!!</h1><br /><p class='winner'>Player 1 scored an amazing " + player1TotalScore +
    " points!</p><p class='loser'>Player 2 only managed a pathetic " + player2TotalScore + " points LOL</p><div class='ingame'><a id='playagain' class='waves-effect waves-light btn btn-large'>PLAY AGAIN</a></div>");
  } else if (player1TotalScore < player2TotalScore) {
    $('.gameover').html("<h1 class='scores'>Winner!!</h1><br /><p class='winner'>Player 2 scored an amazing  " + player2TotalScore +
    " points!</p><p class='loser'>Player 1 only managed a pathetic " + player1TotalScore + " points LOL</p><div class='ingame'><a id='playagain' class='waves-effect waves-light btn btn-large'>PLAY AGAIN</a></div>")
  } else if (player1TotalScore === player2TotalScore) {
    $('.gameover').html("<h1 class='scores'>It's a Tie!</h1><br /><p class='winner'>You both scored  " + player2TotalScore +
    " points! That's kinda weird, right?</p><div class='ingame'><a id='playagain' class='waves-effect waves-light btn btn-large'>PLAY AGAIN</a></div>");
  }
};


// Game Ending function
var gameOver = function() {
  $('.gameboard').hide();
  $('.startpage').hide();
  $('header').hide();
  $('#rollbuttondiv').hide();
  pickWinner();
  $('.gameover').show();
  $('#playagain').on('click', function() {
    window.location.reload(true);
  });
}

// Turn End Events
player1Turn.on('click', function() {
  if (this.className === 'savedp1') {
  } else if (rollNum > 0) {
    var addScore = parseInt($(this).html(), 10)
    if ($('.player1score').attr('data-value')) {
      var oldScore = parseInt($('.player1score').attr('data-value'), 10);
    } else {
      var oldScore = 0
    };
    var newScore = oldScore + addScore;
    if (this.className.includes('bonus') === true) {
      player1Bonus.push(addScore);
    };
    if (leftBonus(player1Bonus) == 35) {
      $('#bonustotalplayer1').html('35');
      $('#bonustotalplayer1').addClass('savedp1')
    } else {
      $('#bonustotalplayer1').html('0');
    }
    player1TotalScore += parseInt(addScore, 10);
    this.className = 'savedp1';
    $('.unplayed').html('');
    $('#rollbutton').addClass('disabled');
    $('.player1score').html('P1 Score: ' + newScore);
    $('.player1score')[0].setAttribute('data-value', newScore);
    setTimeout(switch2p2, 2000);
  }
});

player2Turn.on('click', function() {
  if (this.className === 'savedp2') {
  } else if (rollNum > 0 && turnCount < 12) {
    var addScore = parseInt($(this).html(), 10);
    if ($('.player2score').attr('data-value')) {
      var oldScore = parseInt($('.player2score').attr('data-value'), 10);
    } else {
      var oldScore = 0;
    };
    var newScore = oldScore + addScore;
    player2TotalScore += parseInt(addScore, 10);
    this.className = 'savedp2';
    $('.unplayed').html('');
    $('#rollbutton').addClass('disabled');
    $('.player2score').html('P2 Score: ' + newScore);
    $('.player2score')[0].setAttribute('data-value', newScore);
    turnCount++;
    setTimeout(switch2p1, 2000);
  } else if (turnCount === 12) {
    var addScore = $(this).html();
    player2TotalScore += parseInt(addScore, 10);
    this.className = 'savedp2';
    $('#rollbutton').addClass('disabled');
    setTimeout(gameOver, 2000);
  }
});

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
