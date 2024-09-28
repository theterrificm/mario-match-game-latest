console.log("Super Mario Match Game");


/*-------------------------------- Constants --------------------------------*/
const board = ["flower", "flower", "flower", "flower", "mushroom", "mushroom", "mushroom", "mushroom", "star", "star", "star", "star", "tencoin", "tencoin", "twentycoin", "twentycoin", "chest", "chest"]

let currentDeck
let match
let miss
let firstCardPicked = ""
let secondCardPicked = ""
let isFlipping = false 

/*------------------------ Cached Element References ------------------------*/
const classicButton = document.getElementsByClassName("classic")

const resetButton = document.getElementsByClassName("reset")

const cardEls = document.querySelectorAll(".facedown")

/*-------------------------------- Functions --------------------------------*/
// Shuffle board and start game
function init() {
  currentDeck = shuffle(board)
  console.log(currentDeck)
}

// Fisher-Yates shuffle algorithm
function shuffle(array) {
  let oldElement
  for (let i = array.length - 1; i >= 0; i--) {
      let rand = Math.floor(Math.random() * (i + 1))
      oldElement = array[i]
      array[i] = array[rand]
      array[rand] = oldElement
  }
  return array
}

function handleClick(evt) {
  if (isFlipping) 
    return  
  const cardIdx = parseInt(evt.target.id)
  if (cardEls[cardIdx].classList.contains("revealed")) 
    return 
  revealCard(cardIdx)
  if (firstCardPicked === "") {
      firstCardPicked = cardIdx
  } else {
      secondCardPicked = cardIdx
      isFlipping = true 
  if (currentDeck[firstCardPicked] === currentDeck[secondCardPicked]) {
      cardEls[firstCardPicked].classList.add("matched")
      cardEls[secondCardPicked].classList.add("matched")
  resetPicks()
  } else {
  setTimeout(() => {
    hideCard(firstCardPicked)
    hideCard(secondCardPicked)
      resetPicks()
        }, 2000) 
    }
  }
}
function revealCard(idx) {
  cardEls[idx].classList.remove("facedown")
  cardEls[idx].classList.add("revealed")
}

function hideCard(idx) {
  cardEls[idx].classList.remove("revealed")
  cardEls[idx].classList.add("facedown")
}

function resetPicks() {
  firstCardPicked = ""
  secondCardPicked = ""
  isFlipping = false  
}

// Loader
var loader = document.querySelector(".loader")
function vanish() {
  loader.classList.add("disappear")
}

// document.querySelector(".lossmsg").innerHTML = YOU LOST!!! 😢


/*----------------------------- Event Listeners -----------------------------*/
document.querySelector(".classic").addEventListener("click", vanish)

cardEls.forEach((cardEl, idx) => {
  cardEl.addEventListener("click", handleClick)
})