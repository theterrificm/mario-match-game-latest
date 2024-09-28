console.log("Super Mario Match Game");


// ------------------ Constants ------------------
const board = ["flower", "flower", "flower", "flower", "mushroom", "mushroom", "mushroom", "mushroom", "star", "star", "star", "star", "tencoin", "tencoin", "twentycoin", "twentycoin", "chest", "chest"]
let currentDeck;
let match;
let miss;
let firstCardPicked = null;
let secondCardPicked = null;
let isFlipping = false;  // New flag to disable input during flip checks

// ------------------ Cached Element References ------------------
const classicButton = document.getElementsByClassName("classic");
console.log(classicButton);
const resetButton = document.getElementsByClassName("reset");
console.log(resetButton);
const cardEls = document.querySelectorAll(".facedown");

// ------------------ Functions ------------------

// Shuffle the board and initialize the game
function init() {
    currentDeck = shuffle(board);
    console.log("After shuffling " + currentDeck);
}

// Shuffle the array using Fisher-Yates algorithm
function shuffle(array) {
    let oldElement;
    for (let i = array.length - 1; i >= 0; i--) {
        let rand = Math.floor(Math.random() * (i + 1));
        oldElement = array[i];
        array[i] = array[rand];
        array[rand] = oldElement;
    }
    return array;
}

// Handle the card click event
function handleClick(evt) {
    if (isFlipping) return;  // Prevent interaction during flip check
    const cardIdx = parseInt(evt.target.id);
    console.log(cardIdx);
    
    if (cardEls[cardIdx].classList.contains("revealed")) return;  // Ignore clicks on revealed cards

    revealCard(cardIdx);

    if (firstCardPicked === null) {
        firstCardPicked = cardIdx;
    } else {
        secondCardPicked = cardIdx;
        isFlipping = true;  // Block further clicks

        if (currentDeck[firstCardPicked] === currentDeck[secondCardPicked]) {
            // console.log("match");
            alert("match");
            cardEls[firstCardPicked].classList.add("matched");
            cardEls[secondCardPicked].classList.add("matched");
            resetPicks();
        } else {
            // console.log("miss");
            alert("miss");
            setTimeout(() => {
                hideCard(firstCardPicked);
                hideCard(secondCardPicked);
                resetPicks();
            }, 1000);  // Add delay before flipping back cards
        }
    }
}

// Reveal a card
function revealCard(idx) {
    cardEls[idx].classList.remove("facedown");
    cardEls[idx].classList.add("revealed");
}

// Hide a card (flip back)
function hideCard(idx) {
    cardEls[idx].classList.remove("revealed");
    cardEls[idx].classList.add("facedown");
}

// Reset the selected cards after each move
function resetPicks() {
    firstCardPicked = null;
    secondCardPicked = null;
    isFlipping = false;  // Enable interaction after flipping
}

// ------------------ Loader functionality ------------------
var loader = document.querySelector(".loader");
function vanish() {
    loader.classList.add("disappear");
}

// Adding event listeners to buttons
document.querySelector(".classic").addEventListener("click", vanish);
cardEls.forEach((cardEl, idx) => {
    cardEl.addEventListener("click", handleClick);
});

init()
