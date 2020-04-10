var values = ["X", "O"];
var gameScore = [0, 0, 0];
var winPoints = [7,56,73,84,146,273,292,448];
var gameOver;
var turn = 0;
var players = [];
var points = [];
var audio1 = new Audio('Blop-Mark_DiAngelo.mp3');
var audio2 = new Audio('Ta Da.mp3');


function startGame() {
    var counter = 1;
    var insertBlocks = "";
    for (i = 1; i <= 3; i++) {
        insertBlocks += '<div id="row-' + i + '">';
        for (j = 1; j <= 3; j++) {
            insertBlocks += '<div onclick="clickedBlock(this, ' + counter + ');" class="block"></div>';
            counter *=2;
        }
        insertBlocks += '</div>';
    }

    document.getElementById("board").innerHTML = insertBlocks;
    document.getElementById("header").className = "hide";
    points = [0, 0];
    turn = 0;
    gameOver = false;
    players[0] = document.getElementById("userName1").value;
    players[1] = document.getElementById("userName2").value;
    addScore();
    event.preventDefault();
    
    document.getElementById("header-name").innerText = "It's " + players[turn] + "'s Turn";
    document.getElementById("board").className = "show";
    document.getElementById("score-table").className = "show";
}

function clickedBlock(clickedDiv, divValue) {
    if (!isWin()) {
        clickedDiv.innerText = values[turn];
        points[turn] += divValue;

        if (isWin()) {
            gameScore[turn]++;
            document.getElementById("header-name").innerText = players[turn] + ", you win!";
            document.getElementById("submit-players").className = "hide";
            document.getElementById("start-again").className = "show";
            addScore();
            audio2.play('Ta Da.mp3');
        } 
        else if (gameOver) {
            gameScore[2]++;
            document.getElementById("header-name").innerText = "It's a Tie, Try Again!";
            document.getElementById("submit-players").className = "hide";
            document.getElementById("start-again").className = "show";
            addScore();
            audio1.play('Blop-Mark_DiAngelo.mp3');
        }
        else {

        if (turn == 0) turn = 1; else turn = 0;
        clickedDiv.attributes["0"].nodeValue = [];
        document.getElementById("header-name").innerText = "It's " + players[turn] + "'s Turn";
        }
    }
}

function isWin() {
    for (i = 0; i < winPoints.length; i++) {
        if((points[turn] & winPoints[i]) == winPoints[i]) { 
            return true; 
        }
    } 
    if (points[0] + points[1] == 511) { gameOver = true;}
    return false; 
}

function addScore() {
    document.getElementById("score-header").innerText = "Score Table";
    document.getElementById("score-1").innerText = players[0] + "'s  Score is " + gameScore[0];
    document.getElementById("score-2").innerText = players[1] + "'s  Score is " + gameScore[1];
    document.getElementById("score-3").innerText = "Ties Score is " + gameScore[2];
}
  

