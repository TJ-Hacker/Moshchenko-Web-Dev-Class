// cards = ["red", "white", "red", "green", "blue", "white", "green", "blue"];
// matchedCards = [];
// firstCard = -1;
// secondCard = -1;

// function initialize() {
//     for 
// }


// function testAPI() {
//     console.log("TEST");
// }

// function revealCard(cardId) {

//     if (!matchedCards.includes(cardId)) {
//         console.log(cardId);
//         let card = document.getElementById(cardId.toString());
//         card.style.backgroundColor = cards[cardId];
//         cardRevealed = true;
    
//         if (firstCard == -1) {
//             firstCard = cardId; 
//         } else if (cardId != firstCard) {
//             secondCard = cardId;
//             matchCards();
//         }
//     }
// }

// function hideAllCards() {
//     let remainingCards = document.getElementsByClassName("remaining");
//     for (let i = 0; i < remainingCards.length; i ++) {
//         remainingCards[i].style.backgroundColor = "black";
//     }
// }

// function matchCards() {
//     if (cards[firstCard] == cards[secondCard]) {
//         console.log("Cards matched!");
//         matchedCards.push(firstCard);
//         matchedCards.push(secondCard);
//     }

//     firstCard = -1;
//     secondCard = -1;
// }

firstClick = -1;
secondClcik = -1;

pairs = 4;
cardHues = [];
cardOrder = [];
staticHues = [];

function initialize() {
    for (let i = 0; i < pairs; i ++) {
        cardHues.push(Math.round(Math.random() * 360));
    }

    while (cardOrder.length < pairs * 2) {
        let cardSelection = cardHues[Math.floor(Math.random() * cardHues.length)];
        let cardIndex = Math.floor(Math.random() * cardOrder.length);


        if (findItem(cardSelection, cardOrder) > -1) {
            cardHues.splice(findItem(cardSelection, cardHues), 1);
        }
        cardOrder.splice(cardIndex, 0, cardSelection);
    }

    let cardList = document.getElementById("cards");

    for (let i = 0; i < cardOrder.length; i ++) {
        let card = document.createElement("input");
        card.setAttribute("type", "button");
        card.setAttribute("onclick", "checkCard(" + i + ");");
        card.id = i;
        card.classList.add("card");
        card.classList.add("hidden");

        cardList.append(card);
    }

    staticHues = cardOrder;
}

function checkCard(index) {
    if (firstClick > -1) {
        if (firstClick == index) {
            hideCard(index);
            firstClick = -1;
        } else {
            secondClick = index;
            revealCard(secondClick);
            tryMatch();
            firstClick = -1;
            secondClick = -1;
        }
    } else {
        firstClick = index;
        revealCard(index);
    }
}

function tryMatch() {
    if (cardOrder[firstClick] == cardOrder[secondClick]) {
        console.log("match!");
    } else {
        console.log("not a match");
    }
    hideCard(firstClick);
    hideCard(secondClick);
}

function revealCard(index) {
    let card = document.getElementById(index.toString());
    card.classList.remove("hidden");
    card.style.backgroundColor = "hsl(" + staticHues[index].toString() + "deg , 100%, 50%)";
}

function hideCard(index) {
    let card = document.getElementById(index.toString());
    card.removeAttribute("style");
    card.classList.add("hidden");
}

function findItem(item, array) {
    for (let i = 0; i < array.length; i ++) {
        if (array[i] == item) {
            return i;
        }
    }
    return -1;
}

function debugReveal() {
    let cards = document.getElementsByClassName("card");

    for (let i = 0; i < cards.length; i ++) {
        revealCard(cards[i].id);
    }
}