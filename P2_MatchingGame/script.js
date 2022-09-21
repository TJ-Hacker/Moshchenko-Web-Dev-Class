cards = ["red", "white", "red", "green", "blue", "white", "green", "blue"];
matchedCards = [];
firstCard = -1;
secondCard = -1;


function testAPI() {
    console.log("TEST");
}

function revealCard(cardId) {

    if (!matchedCards.includes(cardId)) {
        console.log(cardId);
        let card = document.getElementById(cardId.toString());
        card.style.backgroundColor = cards[cardId];
        cardRevealed = true;
    
        if (firstCard == -1) {
            firstCard = cardId; 
        } else if (cardId != firstCard) {
            secondCard = cardId;
            matchCards();
        }
    }
}

function hideAllCards() {
    let remainingCards = document.getElementsByClassName("remaining");
    for (let i = 0; i < remainingCards.length; i ++) {
        remainingCards[i].style.backgroundColor = "black";
    }
}

function matchCards() {
    if (cards[firstCard] == cards[secondCard]) {
        console.log("Cards matched!");
        matchedCards.push(firstCard);
        matchedCards.push(secondCard);
    }

    firstCard = -1;
    secondCard = -1;
}