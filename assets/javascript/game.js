var stats = {
    wins: 0,
    losses: 0,
    guessesLeft: 10,
    guessDisplay: "_ ",
    guessesMade: "",
    fillInCounter: 0,
    result: 0,
    pokemon: ["pikachu", "charmander", "squirtle", "bulbasaur", "mewtwo", "charizard", "golem", "gengar", "alakazam", "dragonite", "geodude", "gyrados", "ditto"],
    guessWord: function () {
        return this.pokemon[Math.floor(Math.random() * this.pokemon.length)]
    },
};

// Initial start-up before user interacts
var computerGuess = stats.guessWord();
document.getElementById("wins").innerHTML = stats.wins;
document.getElementById("losses").innerHTML = stats.losses;
document.getElementById("guessesLeft").innerHTML = stats.guessesLeft;

stats.guessDisplay = stats.guessDisplay.repeat(computerGuess.length)
document.getElementById("guessDisplay").innerHTML = stats.guessDisplay;

document.onkeyup = function userGuess(event) {

    // Check to see if user has made that guess before
    var userGuess = event.key;
    for (var i = 0; i < stats.guessesMade.length; i++) {
        if (userGuess === stats.guessesMade[i]) {
            alert("You made that guess already.");
            return;
        }
    }

    // If user misses, missCounter will change the number of lives, rest is to record input history
    var missCounter = 1;
    stats.guessesMade = stats.guessesMade + userGuess + " ";
    document.getElementById("guessesMade").innerHTML = stats.guessesMade;

    // Check if user input matches any of the characters of the word
    for (var check = 0; check < computerGuess.length; check++) {
        if (userGuess === computerGuess[check]) {
            var sliceEnd = check * 2
            var sliceCheck = sliceEnd + 1
            stats.guessDisplay = stats.guessDisplay.slice(0, sliceEnd) + userGuess + stats.guessDisplay.slice(sliceCheck);
            document.getElementById("guessDisplay").innerHTML = stats.guessDisplay;
            stats.fillInCounter++;
            missCounter = 0;
        }
    }

    // If user has completed guessing the word, wins go up by 1, change result counter to 1, if not, reduce guesses by 1
    if (stats.fillInCounter === computerGuess.length) {
        stats.wins++;
        document.getElementById("wins").innerHTML = stats.wins;
        stats.result = 1;
        alert("Congratulations! You guessed the pokemon, " + computerGuess + ".");
    } else if (missCounter === 1) {
        stats.guessesLeft--;
        document.getElementById("guessesLeft").innerHTML = stats.guessesLeft;
    }

    // If user has ran out of guesses, losses go up by 1, change result counter to 1
    if (stats.guessesLeft === 0) {
        stats.losses++;
        document.getElementById("losses").innerHTML = stats.losses;
        stats.result = 1;
    }

    //if result counter equals 1, reset the game, change result counter to 0
    if (stats.result === 1) {
        computerGuess = stats.guessWord();
        stats.guessesLeft = 10;
        document.getElementById("guessesLeft").innerHTML = stats.guessesLeft;
        stats.guessesMade = "";
        document.getElementById("guessesMade").innerHTML = stats.guessesMade;
        stats.guessDisplay = "_ ".repeat(computerGuess.length);
        document.getElementById("guessDisplay").innerHTML = stats.guessDisplay;
        stats.result = 0;
        stats.fillInCounter = 0;
    }
}