var stats = {
    wins: 0,
    losses: 0,
    guessesLeft: 9,
    guessDisplay: "_ ",
    guessesMade: "",
    result: 0,
    pokemon: ["pikachu", "charmander", "squirtle", "bulbasaur", "mewtwo", "charizard", "scyther", "gengar", "alakazam"],
    guessWord: function() {
        return this.pokemon[Math.floor(Math.random() * this.pokemon.length)]
    },
};

var computerGuess = stats.guessWord();

document.getElementById("wins").innerHTML = stats.wins;
document.getElementById("losses").innerHTML = stats.losses;
document.getElementById("guessesLeft").innerHTML = stats.guessesLeft;

console.log(computerGuess);
stats.guessDisplay = stats.guessDisplay.repeat(computerGuess.length)
document.getElementById("guessDisplay").innerHTML = stats.guessDisplay;

document.onkeyup = function userGuess(event) {

    var userGuess = event.key;
    for (var i = 0; i < stats.guessesMade.length; i++) {
        if (userGuess === stats.guessesMade[i]) {
            alert("You made that guess already.");
            return;
        }
    }

    for (var check = 0; check < computerGuess.length; check++) {
        debugger;
        if (userGuess === computerGuess[check]) {
            stats.guessDisplay = stats.guessDisplay.slice(0, check) + userGuess + stats.guessDisplay.slice(check-1);
            document.getElementById("guessDisplay").innerHTML = stats.guessDisplay;
        }
    }

    if (userGuess === stats.guessWord) {
        stats.guessesLeft--;
        document.getElementById("guessesLeft").innerHTML = stats.guessesLeft;
        stats.wins++;
        document.getElementById("wins").innerHTML = stats.wins;
        stats.result = 1;
        alert("Congratulations! You guessed the letter, " + stats.guessWord + "." + " It took you " + (9 - stats.guessesLeft) + " tries.");
    } else {
        stats.guessesLeft--;
        document.getElementById("guessesLeft").innerHTML = stats.guessesLeft;
        stats.guessesMade = stats.guessesMade + userGuess + " ";
        document.getElementById("guessesMade").innerHTML = stats.guessesMade;
    }

    if (stats.guessesLeft === 0) {
        stats.losses++;
        document.getElementById("losses").innerHTML = stats.losses;
        stats.result = 1;
    }

    if (stats.result === 1) {
        computerGuess = stats.guessWord();
        stats.guessesLeft = 9;
        document.getElementById("guessesLeft").innerHTML = stats.guessesLeft;
        stats.guessesMade = [];
        document.getElementById("guessesMade").innerHTML = stats.guessesMade;
        stats.result = 0;
    }
}