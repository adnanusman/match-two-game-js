var matchTwoApp = {
  activeCards: [],
  score: 0,
  init: function() {
    this.cardFrontEventListeners();
    this.cardBackEventListeners();
  },
  // Setup Event Listeners for the front side of the card.
  cardFrontEventListeners: function() {
    var cardfronts = document.querySelectorAll('.card-front');
    var app = this;

    // Add event listeners to all the card fronts.
    for(i = 0; i < cardfronts.length; i++) {
      cardfronts[i].addEventListener('click', function(e) {
        var cardFront = e.target;
        var cardBack = e.target.previousElementSibling;

        app.activeCards.push({cardFront, cardBack});

        // Flip the cards
        var changeState = new Promise(function(resolve) {
          cardFront.style.transform = 'perspective(600px) rotateY(-180deg)';
          cardBack.style.transform = 'perspective(600px) rotateY(0deg)';
          resolve();
        })

        // If there are 2 cards in flipped condition.
        if(app.activeCards.length === 2) {
          changeState.then(function() {
            setTimeout(function() {
              app.resetCards();
            }, 500);
          })
        }

        // // If there are 2 cards in flipped condition.
        // if(app.activeCards.length === 2) {
        //   setTimeout(resetCards, 500);
        //   function resetCards() {
        //     app.activeCards.forEach(card => {
        //       card.cardBack.style.transform = '';
        //       card.cardFront.style.transform = '';
        //       app.clearCards();
        //     })
        //   }
        // }
      })
    }
  },
  cardBackEventListeners: function() {
    var cardbacks = document.querySelectorAll('.card-back');
    var app = this;
    // Add event listeners on all the cards backs.
    for(i = 0; i < cardbacks.length; i++) {
      cardbacks[i].addEventListener('click', function(e) {
        var cardBack = e.target;
        var cardFront = e.target.nextElementSibling;
        
        // Flip the cards back to normal state.
        cardFront.style.transform = 'perspective(600px) rotateY(0deg)';
        cardBack.style.transform = 'perspective(600px) rotateY(180deg)';
        app.clearCards();
      })
    }
  },
  clearCards: function() {
    this.activeCards = [];
  },
  resetCards: function() {
    this.activeCards.forEach(card => {
      card.cardBack.style.transform = '';
      card.cardFront.style.transform = '';
    })
    this.clearCards();
  }
}

matchTwoApp.init();