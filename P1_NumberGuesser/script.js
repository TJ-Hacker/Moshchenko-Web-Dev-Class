function initialize() {
  number = Math.round(Math.random() * 100);
  guesses = document.getElementById("guessBox");
  guessInput = document.getElementById("guess");

  guessInput.value = "";
  guessInput.addEventListener("keypress", function(event) {
    if (event.key == "Enter" && guessInput.value != "") {
      checkInput(guessInput.value);
    }
  });

  document.getElementById("resetButton").classList.add("hide");
}

function addGuess(guess) {
  guessToAdd = document.createElement("div");
  guessToAdd.appendChild(document.createTextNode(guess));
  guessToAdd.classList.add("realGuess");
  guessToAdd.classList.add("guess");

  if (guess > number) {
    guessToAdd.classList.add("hot");
  } else if (guess < number) {
    guessToAdd.classList.add("cold");
  } else if (guess == number) {
    guessToAdd.classList.add("win");
    win();
  }

  guesses.prepend(guessToAdd);
  guessInput.value = "";
}

function checkInput(input) {
  if (/^\d+$/.test(input)) {
    console.log("Valid: " + parseInt(input))
    addGuess(input);
  } else {
    alert(input + " isn't a number!");
    guessInput.value = "";
  }
}

function win() {
  alert("You Win! You guessed the number, " + number + "!");
  document.getElementById("resetButton").classList.remove("hide");
}

function reset() {
  var guessList = document.getElementsByClassName("realGuess");
  console.log(guessList);
  while (guessList.length > 0) {
    guessList[0].remove();
  }

  initialize();
}