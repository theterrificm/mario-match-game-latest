console.log("Super Mario Match Game");


// ------------------ Constants ------------------
const board = ["flower", "flower", "flower", "flower", "mushroom", "mushroom", "mushroom", "mushroom", "star", "star", "star", "star", "tencoin", "tencoin", "twentycoin", "twentycoin", "chest", "chest"]
let currentDeck;
let match;
let miss;
let firstCardPicked = null;
let secondCardPicked = null;
let isFlipping = true;  // New flag to disable input during flip checks
let timeLeft = 10 // Countdown timer value
let win = 0
let loss = 0 

// ------------------ Cached Element References ------------------
const classicButton = document.getElementsByClassName("classic");
console.log(classicButton);
const resetButton = document.getElementsByClassName("reset");
console.log(resetButton);
const cardEls = document.querySelectorAll(".facedown");
const playAgainBtn = document.getElementById('play-again')
const winTotal = document.getElementById('win-count')
const lossTotal = document.getElementById('loss-count')

// ------------------ Functions ------------------

// Shuffle the board and initialize the game
function init() {
    currentDeck = shuffle(board);
    console.log("After shuffling " + currentDeck);
}

init();

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
    if (isFlipping === false) return;  // Prevent interaction during flip check
    const cardIdx = parseInt(evt.target.id);
    evt.target.classList.add(currentDeck[cardIdx]) // Adding class according to the ID to show the front image
    console.log(cardIdx);
    
    if (cardEls[cardIdx].classList.contains("revealed")) return;  // Ignore clicks on revealed cards

    revealCard(cardIdx);

    if (firstCardPicked === null) {
        firstCardPicked = cardIdx;
    } else {
        secondCardPicked = cardIdx;
        isFlipping = false;  // Block further clicks

        if (currentDeck[firstCardPicked] === currentDeck[secondCardPicked]) {
            console.log("match");
            cardEls[firstCardPicked].classList.add("matched");
            cardEls[secondCardPicked].classList.add("matched");
            win++
            resetPicks();
        } else {
            console.log("miss");
            setTimeout(() => {
                hideCard(firstCardPicked);
                hideCard(secondCardPicked);
                loss++
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
    // cardEls[idx].classList.remove("revealed");
    // cardEls[idx].classList.add("facedown");
    cardEls[idx].className = "facedown";
}

// Reset the selected cards after each move
function resetPicks() {
    firstCardPicked = null;
    secondCardPicked = null;
    isFlipping = true;  // Enable interaction after flipping
}

// ------------------ Loader functionality ------------------
var loader = document.querySelector(".loader");
function vanish() {
    loader.classList.add("disappear");
    
    countdownTimer() // Function call to start the countdown timer

}

// Adding event listeners to buttons
document.querySelector(".classic").addEventListener("click", vanish);

playAgainBtn.addEventListener("click", resetGame) // Assigning on click event to play again button 

cardEls.forEach((cardEl, idx) => {
    cardEl.addEventListener("click", handleClick);
});



function countdownTimer (timeLeft = 10) {
    const intervalID = setInterval(() => {
        // Decrease the time left by 1 second
        timeLeft--;
    
        // Update the countdown display
        document.getElementById('countdown-timer').textContent = timeLeft;
    
        // When time is up, stop the countdown
        if (timeLeft <= 0) {
            clearInterval(intervalID);
            // document.getElementById('countdown').textContent = "Time's up!";
            endGame(); // This function will execute when the timer completes
        }
    }, 1000); // 1000 milliseconds = 1 second    
} 

//Function that will run after the countdown completes
function endGame(){
    winTotal.innerText = win
    lossTotal.innerText = loss
    const winLossInfo = document.getElementsByClassName('count-results')
    for (let i=0; i< winLossInfo.length; i++){
        winLossInfo[i].style.display = "block"
    }
    playAgainBtn.style.display = "block"
    // document.getElementById('countdown').style.display = "none"
    isFlipping = false
}


function resetGame(){
    playAgainBtn.style.display = "none"
    win = 0
    loss = 0
    winTotal.innerText = win
    lossTotal.innerText = loss
    console.log('win or loss in reset func' + win + loss)
    const winLossInfo = document.getElementsByClassName('count-results')
    for (let i=0; i< winLossInfo.length; i++){
        winLossInfo[i].style.display = "none"
    }
    countdownTimer()
    const revealedCards = document.getElementsByClassName('revealed')
    const revCardsArray = Array.from(revealedCards)
    const revCardsArrayLength = revCardsArray.length
    // Checking for the existing flipped cards and turning them back
    for (let i=0; i<revCardsArrayLength; i++){
        
        revCardsArray[i].className = 'facedown'
    }
    init(); //Re-shuffle the deck collection 
    isFlipping = true; //Enabling the click on the cards
}