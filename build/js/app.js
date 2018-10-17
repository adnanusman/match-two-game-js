var matchTwoApp = {
  activeCards: [],
  init: function() {
    this.cardFrontEventListeners();
    this.cardBackEventListeners();
  },
  // Setup Event Listeners for the front side of the card.
  cardFrontEventListeners: function() {
    var cardfronts = document.querySelectorAll('.card-front');
    var app = this;

    for(i = 0; i < cardfronts.length; i++) {
      cardfronts[i].addEventListener('click', function(e) {
        var cardFront = e.target;
        var cardBack = e.target.previousElementSibling;
        
        app.activeCards.push({cardFront, cardBack});
        // Flip the cards
        cardFront.style.transform = 'perspective(600px) rotateY(-180deg)';
        cardBack.style.transform = 'perspective(600px) rotateY(0deg)';

        if(app.activeCards.length === 2) {
          setTimeout(resetCards, 1000);
          
          function resetCards() {
            app.activeCards.forEach(card => {
              card.cardBack.style.transform = '';
              card.cardFront.style.transform = '';

              app.activeCards = [];            
            })
          }
        }


      })
    } 
  },
  cardBackEventListeners: function() {
    var cardbacks = document.querySelectorAll('.card-back');

    for(i = 0; i < cardbacks.length; i++) {
      cardbacks[i].addEventListener('click', function(e) {
        console.log(e);
        var cardBack = e.target;
        var cardFront = e.target.nextElementSibling;
        
        // Flip the cards back to normal state.
        cardFront.style.transform = 'perspective(600px) rotateY(0deg)';
        cardBack.style.transform = 'perspective(600px) rotateY(180deg)';
      })
    }
  }
}

matchTwoApp.init();