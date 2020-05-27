/*

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)

*/
var globalScore, activePlayer, roundScore, goal, inGame, prevDice1, prevDice2;
 
init();

// create an event listener for the roll 
document.querySelector('.btn-roll').addEventListener('click',function(){
    if(inGame){
        // we roll a dice and store that value
        var dice1 = Math.floor(Math.random()*6 + 1 );
        var dice2 = Math.floor(Math.random()*6 + 1);
        document.querySelector(".dice1").style.display = "block" ;
        document.querySelector(".dice2").style.display = "block" ;

        document.querySelector(".dice1").src = "dice-" + dice1 +".png";
        document.querySelector(".dice2").src = "dice-" + dice2 +".png";



        if( dice1 !== 1 || dice2 !== 1 ){
            // add score to roundScore
            roundScore += dice1 + dice2;
            // then update score of the current score
            document.querySelector("#current-" + activePlayer).textContent = roundScore;

            //console.log("Dice:" + dice+ "\n");
            //console.log("prevDice:"+ prevDice +"\n");
            if( dice1 === 6 && prevDice1 ===6 || dice2 === 6 && prevDice2 ===6 ){
  
                // set score to 0 and display UI
                globalScore[activePlayer] = 0
                document.getElementById("score-"+ activePlayer).textContent = globalScore[activePlayer];
                nextPlayer();
            }    

            // Save the value of current dice to prev dice
            prevDice1 = dice1;
            prevDice2 = dice2;
        }
        else{
            nextPlayer();
        }
    }
    });

// create an event listener for the hold button
document.querySelector(".btn-hold").addEventListener("click", function(){
    if(inGame){
        // add score to the global player and change active player
        globalScore[activePlayer] += roundScore;
        
        // display the UI
        document.getElementById("score-"+ activePlayer).textContent = globalScore[activePlayer];

        // check if the winner has won the game
        if(globalScore[activePlayer] >= goal ){
            // display the winner
            document.querySelector("#name-"+ activePlayer ).textContent = "Winner!";
            document.querySelector(".dice1").style.display = "none";
            document.querySelector(".dice2").style.display = "none";

            inGame = false;
        }else{
            nextPlayer();
        }
    }
}); 

// create at event listener for the new game button
document.querySelector(".btn-new").addEventListener("click", function(){
    init();
});

function init(){

    var input = document.querySelector(".final-score").value;
    // Check if there is anything in input, if not set to default winning score
    input? goal = input: goal = 100;
    console.log("Goal is "+ goal);
    
    if(goal){}
    globalScore = [0,0];
    activePlayer = 0;
    roundScore = 0;
    inGame = true;
    prevDice1 = 0;
    prevDice2 = 0;

    // Initialize the gameScore to all 0 
    document.getElementById("score-0").textContent = 0;
    document.getElementById("score-1").textContent = 0;
    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-1").textContent = 0;

    // No dice value at the screen
    document.querySelector(".dice1").style.display = "none";
    document.querySelector(".dice2").style.display = "none";


    // change the correct player name
    document.querySelector("#name-0").textContent = "Player 1";
    document.querySelector("#name-1").textContent = "Player 2";

    // Initialize player 1 to start the game
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");

}

function nextPlayer(){
    
    // use a ternary operator when there are short if-else statements
    activePlayer === 0? activePlayer = 1:activePlayer = 0;
    roundScore = 0;
    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-1").textContent = 0;

    document.querySelector(".player-0-panel").classList.toggle("active");   
    document.querySelector(".player-1-panel").classList.toggle("active")

    document.querySelector(".dice1").style.display = "none";
    document.querySelector(".dice2").style.display = "none";

    // initailize the prevDice to 0
    prevDice = 0;
}

