/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/




var scores, roundScore, activePlayer, gamePlaying;



var diceDOM = document.querySelector(".dice");

//New game state
startNewGame();
function startNewGame() {

    //Set correct state of the game

    gamePlaying = true;


    //Hide initial dice

    diceDOM.style.display = "none";

    //Get to 0

    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    document.getElementById("score-0").textContent = 0;
    document.getElementById("current-0").textContent = 0;
    document.getElementById("score-1").textContent = 0;
    document.getElementById("current-1").textContent = 0;

    document.getElementById("name-" + 0).textContent = "Player 1";
    document.getElementById("name-" + 1).textContent = "Player 2";

    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");

    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");

    document.querySelector(".player-0-panel").classList.add("active");
}


var rollCount = 0;

document.querySelector('.btn-roll').addEventListener('click', function(){
    if (gamePlaying) {
        var dice = Math.floor(Math.random() * 6) + 1;
        diceDOM.style.display = "block";
        diceDOM.src = "dice-" + dice + ".png";


        if (dice !== 6) {
            rollCount = 0;
            roundScore += dice;
            document.getElementById("current-" + activePlayer).textContent = roundScore;
        }
        else if (dice === 6) {
            roundScore += dice;
            document.getElementById("current-" + activePlayer).textContent = roundScore;
            ++rollCount;
            if (rollCount === 2) {
                rollCount = 0;
                nextPlayer();
            } else if (rollCount < 2) {
                document.getElementById("current-" + activePlayer).textContent = roundScore;
            }

        }
//        else {
//            nextPlayer();
//        }
    }

});


document.querySelector(".btn-hold").addEventListener('click', function() {

    if (gamePlaying) {
        //Update scrore
        scores[activePlayer] += roundScore;

        //Update UI
        document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];

        //Check if player is winner
        if (scores[activePlayer] >= 100) {
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            document.getElementById("name-" + activePlayer).textContent = "WINNER";
            diceDOM.style.display = 'none';

            //Off the game

            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

function nextPlayer() {
        document.getElementById("current-" + activePlayer).textContent = 0;
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        document.querySelector(".player-0-panel").classList.toggle("active");
        document.querySelector(".player-1-panel").classList.toggle("active");
        diceDOM.style.display = "none";
}

document.querySelector(".btn-new").addEventListener('click', startNewGame);
