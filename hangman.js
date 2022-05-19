// console.log("R" === " ");


let guesses;

let lives;

// const numOfWords = guesses.length;
let numOfWords;

let randomNumber;
//  = Math.floor(Math.random() * numOfWords);

let wordToGuess;

// console.log("Length of word to guess: " + wordToGuess);
// wordToGuess = ["d", "o", "g"];
let hiddenWordLength;
// = wordToGuess.length;
// console.log("length of hidden word " + hiddenWordLength);

let guessedLetters;

// ********************************  bonus feature  ************************************//
let hints = 2;
// ********************************  bonus feature  ************************************//
let livesLeftField = document.querySelector(".lives_left");


function setUpGame() {
  guesses = [
    ["C", "A", "N", "A", "D", "A"],
    ["U", "N", "D", "E", "R", " ", "T", "H", "E", " ", "G", "U", "I"],
    ["W", "E", "B", " ", "D", "E", "V"],
    ["S", "P", "A", "N", "I", "S", "H"],
    ["P", "R", "O", "G", "R", "A", "M", "M", "I", "N", "G"],
    ["I", "C", "E", " ", "C", "R", "E", "A", "M"]
  ]
  lives = 5;
  numOfWords = guesses.length;
  randomNumber = Math.floor(Math.random() * numOfWords);
  wordToGuess = guesses[randomNumber];
  hiddenWordLength = wordToGuess.length;
  guessedLetters = [];
  generateHiddenChars();

  // ********************************  bonus feature  ************************************//
  hints = 2;
  // ********************************  bonus feature  ************************************//
  livesLeftField.innerHTML = `You have ${lives} tries left`;
}

setUpGame();



function generateHiddenChars() {
  let isSpace;
  for (let i = 0; i < hiddenWordLength; i++) {
    isSpace = wordToGuess[i] === " ";
    // console.log(!isSpace);
    // console.log(wordToGuess[i]);
    let tag = document.createElement("p");
    let text = document.createTextNode("-");
    tag.appendChild(text);
    tag.className = "hidden_char";
    // tag.setAttribute("id", "1");
    tag.id = `hidden_char_index_${i}`;

    let element = document.querySelector(".hidden_word");
    element.appendChild(tag);
    // console.log(tag.className);
    // }
    if (isSpace) {
      tag.style.visibility = "hidden";
    }
  }
}

// generateHiddenChars();


// const guess = 'd';
function checkUserGuess() {

  if (lives <= 0) {
    alert("You have 0 lives left! Restart if you wanna play again :)");
    return;
  }

  let letterFound = false;
  const userGuess = getUserInput();
  if (!isInputValid(userGuess)) {
    alert("Please try again");
    return;
  } else {

    // guess is valid and it's a new letter that hasn't been guessed

    for (let i = 0; i < hiddenWordLength; i++) {
      if (userGuess === wordToGuess[i]) {
        const hiddenChar = document.getElementById(`hidden_char_index_${i}`);
        hiddenChar.innerHTML = userGuess;
        letterFound = true;
      }
    }

    if (!letterFound) {
      lives--;
      alert(`Incorrect! You have ${lives} lives left`);
    }

    guessedLetters.push(userGuess);
    console.log(guessedLetters);
    updateUI("guesses_made", "p", userGuess, "guessed_letters");
    livesLeftField.innerHTML = `You have ${lives} tries left`;



  }
} // end checkUserGuess method


const guessBtn = document.getElementById("guess_btn");
guessBtn.addEventListener("click", checkUserGuess);

// make sure the user enteres an acceptable input
// ex, 123 is not a valid input
function isInputValid(userInput) {
  let isValid = true;

  if (userInput === '') {
    alert("Please provide an input");
    console.log("here");
    isValid = false;
  }
  if (userInput.length > 1) {
    alert("Please enter a single character/letter");
    isValid = false;
  }

  if (guessedLetters.includes(userInput)) {
    console.log("here90");
    alert("Looks like you've already made this guess!");
    isValid = false;
  }

  // try checking if the user enters weird symbols such as &, % etc..

  return isValid;
}

function getUserInput() {
  //  alert("clicked");
  let inputFieldElement = document.getElementById("guess_field");
  let userInput = inputFieldElement.value;
  console.log(userInput);

  inputFieldElement.value = "";
  return userInput.toUpperCase();// added to upp case for bonus feature

}

let restartBtn = document.getElementById("restart_btn");
restartBtn.addEventListener("click", function () {
  // delete the hidden characters so we can replace them with the new word to guess
  document.querySelectorAll('.hidden_char')
    .forEach(pTag => pTag.remove());
  // can you try remove the guessed letters elements as well?
  document.querySelectorAll('.guessed_letters')
    .forEach(pTag => pTag.remove());
  setUpGame();
  getHints();


});

// This method will create a custom element with text content and a classname

// Although we can write this code inside the checkUserGuess function,
// it is a good idea to avoid cluttering it with code. 
// A good practice when writing your functions is to make sure they do
// one thing only. For example, a function that is called getSum(a,b)
// should probably only add 2 numbers and return their sum. 
// Although not disallowed, the sum function shouldn't 
function updateUI(parent, element, content, className) {
  let tag = document.createElement(element);
  let text = document.createTextNode(content);

  // tag.setAttribute("id", "1");
  // tag.id = `hidden_char_index_${i}`;
  // console.log("the id is: " + tag.id);
  tag.appendChild(text);
  tag.innerHTML = content;
  tag.className = className;
  let target = document.querySelector(`.${parent}`);
  target.appendChild(tag);
  // console.log(tag.className);
}


// ********************************  bonus feature  ************************************//
function getHints() {
  document.querySelectorAll('.hidden_char')
    .forEach(pTag => pTag.addEventListener('click', function () {
      if (hints > 0) {
        console.log("clicked");
        let lastCharIndex = pTag.id.length;
        console.log(lastCharIndex);
        let index = pTag.id.charAt(lastCharIndex - 1);
        console.log(index);
        // pTag.innerHTML =  parseInt(index);
        // console.log(wordToGuess[parseInt(index)]);
        pTag.innerHTML = wordToGuess[parseInt(index)];
        // ****** For bonus ******//
        let hint = pTag.innerHTML;
        if (!guessedLetters.includes(hint)) {
          guessedLetters.push(hint);
          updateUI("guesses_made", "p", hint, "guessed_letters");
        }
        checkHint(hint);

        hints--;
      }
    }));
}

getHints();

function revealChar() {
  if (hints > 0) {
    const randomNum = Math.floor(Math.random() * hiddenWordLength);
    let pTag = document.getElementById(`hidden_char_index_${randomNum}`);
    // console.log(randomNum);
    pTag.innerHTML = wordToGuess[randomNum];
    let hint = pTag.innerHTML;
    guessedLetters.push(hint);
    updateUI("guesses_made", "p", hint, "guessed_letters");
    checkHint(hint);
    hints--;
  }
}

function checkHint(hint) {
  for (let i = 0; i < hiddenWordLength; i++) {
    if (wordToGuess[i] === hint) {
      document.getElementById(`hidden_char_index_${i}`).innerHTML = hint;
    }
  }
}

document.getElementById("hint_btn").addEventListener('click', revealChar);







