class Game {
  constructor() {
    this.activeCards = [];
    this.randomColors = [];
    this.score = 0;

    this.assignRandomColors();
    this.setupEventListeners();
    this.updateScore();
  }
}

Game.prototype.setupEventListeners = function() {
  // Disabled back event listeners to avoid cheating/additional scoring by re-flipping matched cards.
  // this.backEventListeners();
  this.cardFrontEventListeners();
  this.gameResetEventListeners();
}

Game.prototype.cardFrontEventListeners = function() {
  var cardfronts = document.querySelectorAll('.card-front');
  var app = this;

  // Add event listeners to all the card fronts.
  for(i = 0; i < cardfronts.length; i++) {
    cardfronts[i].addEventListener('click', (e) => {
      var cardFront = e.target;
      var cardBack = e.target.previousElementSibling;

      app.activeCards.push({cardFront, cardBack});

      // Flip the cards
      var changeState = new Promise((resolve) => {
        cardFront.style.transform = 'perspective(600px) rotateY(-180deg)';
        cardBack.style.transform = 'perspective(600px) rotateY(0deg)';
        resolve();
      })

      // If there are 2 cards in flipped condition.
      if(app.activeCards.length === 2) {
        changeState.then(function() {

          var cardback1 = app.activeCards[0].cardBack;
          var cardback2 = app.activeCards[1].cardBack;

          if(cardback1.style.background === cardback2.style.background) {
            app.score += 2;
            app.updateScore();
            app.clearCards();
            return;
          } else {
            setTimeout(function() {
              app.resetCards();
            }, 500);
          }
        })
      }
    })
  }
}

// This is not being used but I wanted to carry it over just in case.
Game.prototype.backEventListeners = function() {
  var cardbacks = document.querySelectorAll('.card-back');
  var app = this;
  // Add event listeners on all the cards backs.
  for(var i = 0; i < cardbacks.length; i++) {
    cardbacks[i].addEventListener('click', function(e) {
      var cardBack = e.target;
      var cardFront = e.target.nextElementSibling;

      // Flip the cards back to normal state.
      cardFront.style.transform = 'perspective(600px) rotateY(0deg)';
      cardBack.style.transform = 'perspective(600px) rotateY(180deg)';
      app.clearCards();
    })
  }
}

Game.prototype.gameResetEventListeners = function() {
  var button = document.getElementById('reset');
  button.addEventListener('click', () => {
    // location.reload();
    this.resetGame();
  })
}

Game.prototype.clearCards = function() {
  this.activeCards = [];
}

Game.prototype.resetCards = function() {
  // set the cards back to their original state.
  this.activeCards.forEach(card => {
    card.cardBack.style.transform = '';
    card.cardFront.style.transform = '';
  })
  this.clearCards();
}

Game.prototype.resetGame = function() {
  var cards = document.querySelectorAll('.card-container');
  // set all cards back to their original state.
  cards.forEach(card => {
    let front = card.childNodes[3];
    let back = card.childNodes[1];
    front.style.transform = '';
    back.style.transform = '';
  });
  new Game;
}

Game.prototype.assignRandomColors = function() {
  // select all the backs of the cards
  var cardbacks = document.querySelectorAll('.card-back');

  // array of colors to choose from
  // TODO: Change this so it imports from a JSON file instead.
  var colorOptions = [
    '#f9ccca',
    '#ea9399',
    '#e4717a',
    '#ab4e52',
    '#be0032',
    '#841b2d',
    '#fab57f',
    '#f38400',
    '#be6516',
    '#a67b5b',
    '#80461b',
    '#593319',
    '#fada5e',
    '#f3c300',
    '#d4af37',
    '#83d37d',
    '#27a64c',
    '#00622d',
    '#a1caf1',
    '#00a1c2',
    '#0067a5',
    '#d399e6',
    '#9a4eae',
    '#602f6b',
    '#bbb',
    '#555',
    '#222'
  ];

  // Add 6 unique colors to the randomColors array.
  for(var i = 0; i < 6; i++) {
    let int = colorOptions.length;
    var num = Math.floor(Math.random() * int);
    // Add each color to the array twice.
    this.randomColors.push(colorOptions[num]);
    this.randomColors.push(colorOptions[num]);
    colorOptions.splice(num, 1);
  }

  // create an array of numbers and shuffle them so colors are distributed randomly.
  var numbers = this.shuffle([0,1,2,3,4,5,6,7,8,9,10,11]);
  // Assign the colors to the cards.
  for(var j = 0; j < cardbacks.length; j++) {
    cardbacks[j].style.background = this.randomColors[numbers[j]];
  }
}

// got this shuffle function from https://stackoverflow.com/questions/18806210/generating-non-repeating-random-numbers-in-js
Game.prototype.shuffle = function(array) {
  var i = array.length,
  j = 0,
  temp;

  while (i--) {
    j = Math.floor(Math.random() * (i+1));

    // swap randomly chosen element with current element
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

Game.prototype.updateScore = function() {
  var scoreDiv = document.querySelector('.score');

  console.log(this.score);
  scoreDiv.innerHTML = 'SCORE: ' + this.score;
}