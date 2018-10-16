var matchTwoApp = {
  init: function() {
    this.cardFrontEventListeners();
    this.cardBackEventListeners();
  },
  cardFrontEventListeners: function() {
    var cardfronts = document.querySelectorAll('.card-front');
 
    for(i = 0; i < cardfronts.length; i++) {
      cardfronts[i].addEventListener('click', function(e) {
        var cardFront = e.target;
        var cardBack = e.target.previousElementSibling;
    
        cardFront.style.transform = 'perspective(600px) rotateY(-180deg)';
        cardBack.style.transform = 'perspective(600px) rotateY(0deg)';
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
    
        cardFront.style.transform = 'perspective(600px) rotateY(0deg)';
        cardBack.style.transform = 'perspective(600px) rotateY(180deg)';
      })
    }
  }
}

matchTwoApp.init();