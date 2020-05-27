/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game


The use of dom,
    can help use setting/getting elements from the html page, just like how we select stuff from html in css

    Help us change an element of an html page
    2 Methods:
        1. document.querySelector(#nameOfElement)
            note that we have to add the # if we are selecting an id

            ?? when do we add the # 
        2. document.getElementByID(nameOfElement)
            element ID is the paramenter
            we can set it equals to an html tag/content

    The query selector method can also be use to change the css of an element.


Events
    like notifications that notify our code,

    Event listeners:
        waits for a specific event to happen then notify the code.

        this event then gets added to the execution stack

To set-up an event handler
    Thus we will need to learn 
    1.callback function,
        adding an event listener to the dom
        we need to specify which element to the query selector
        in the addEventListener("event we are listening to", function to be executed)
            this function should just be the function name
            do not add() because we are not calling the function, instead, we are just passing it as an argument

        why is it a callback function?
            a function that we pass to another function as an argument that is called back by another function.
            We do not call this function but the event listener does
            
    2.anonymous function 
        a function that does not have a name, we cannot use the same function in another place
        

    We can refer to the mozilla firefox event page to look for the possible events that we can listen to.
    
    ** Make it a habbit to add comments, and then write code**

    For simple if statement, we can use ternary operator to shorten our code

    with javascript, we can also change the style of the page

    add 
    remove
    toggle 
    
    
Implementing hold function and Applying the DRY principle

    DRY( Do not repeat yourself) principle
        when something is duplicated, create a new function
    Implementing hold function,
        add player score to the global score
        update the UI
        check if player won the game


?? what does .classlist

What is a state variable?
    state tells us the condition of a system
    
*/

var globalScore, activePlayer, roundScore, goal, inGame;

goal = 20;

init();

// create an event listener for the roll 
document.querySelector('.btn-roll').addEventListener('click',function(){
    if(inGame){
        // we roll a dice and store that value
        var dice = Math.floor(Math.random()*6 + 1 );
        document.querySelector(".dice").style.display = "block" ;
        document.querySelector(".dice").src = "dice-" + dice +".png";

        // Show the dice value on the screen


        if( dice !== 1 ){
            // add score to roundScore
            roundScore += dice;
            // then update score of the current score
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
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
            document.querySelector(".dice").style.display = "none";

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
    globalScore = [0,0];
    activePlayer = 0;
    roundScore = 0;
    inGame = true;

    // Initialize the gameScore to all 0 
    document.getElementById("score-0").textContent = 0;
    document.getElementById("score-1").textContent = 0;
    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-1").textContent = 0;

    // No dice value at the screen
    document.querySelector(".dice").style.display = "none";

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

    document.querySelector(".dice").style.display = "none";
}

