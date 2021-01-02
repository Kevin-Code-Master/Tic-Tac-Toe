const gameIntro = document.querySelector('.gameIntro');//This is the game introduction page
const startGame = document.getElementById('startGame'); //This is the button for starting the game
const welcome = document.querySelector('.welcome');//For the welcome message
const restartBtn = document.getElementById('restart');//Restart button
const winningMessage = document.querySelector('.winningMessage');
const winningMessageContainer = document.querySelector('.message');
const cellElements = document.querySelectorAll('[data-cell]');
const exit = document.getElementById('exit');
const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]
// EXIT THE GAME
exit.addEventListener('click', (e)=>{
    gameIntro.classList.add('.gameIntro');
    gameIntro.setAttribute('style','display: flex;');
});
// initialize the classes to be added on cell Click
const class_O = ('o');
const class_X = ('x');
// This is to remove the intro page and expose the gameboard
startGame.addEventListener('click',(e) => {
    gameIntro.setAttribute('style','display: none;');
})
//This is for the loading of the window
window.addEventListener('load',(e) =>{
    let welcomeMsg = document.createElement('p');
    welcome.appendChild(welcomeMsg);
    welcomeMsg.innerText = "Welcome, Click Start Game";
});

let oTurn;

gameStart();

// for restarting the game
restart.addEventListener('click', (e) =>{
    gameStart();
    winningMessageContainer.setAttribute('style','display:none;');
})
// Function for starting the game
function gameStart(){
    oTurn = false;
    cellElements.forEach((cell) =>{
        cell.addEventListener('click', handleClick,{once:true});
        cell.classList.remove(class_X);
        cell.classList.remove(class_O);
    });
}
// To check whose turn it is;
function handleClick(e){
    // place a mark
    const cell = e.target;
    const currentClass = oTurn? class_O: class_X; 

    placeMark(cell,currentClass)
    // Check for win
    if (checkWin(currentClass)) {
        endGame(false);
    } 
    else if(isDraw()) {
        endGame(true);
    }
    else{
        switchTurn();
    }
}
function placeMark (cell, currentClass){
    cell.classList.add(currentClass)
}
// function for swapping the turn
function switchTurn(){
    oTurn = !oTurn
}
// Check for win
function checkWin(currentClass){
    return WINNING_COMBINATIONS.some((combination) => {
        return combination.every((index) =>{
            return cellElements[index].classList.contains(currentClass)
        })
    })
}
// function for ending the game
function endGame(draw){
    if (draw) {
        winningMessage.innerText = `It's a Draw!`;
    }
    else{
        winningMessage.innerText = `${oTurn? "O's": "X's"} Win!`;
    }
winningMessage.classList.add('message');
winningMessageContainer.setAttribute('style','display:flex;')
}
// If a draw
function isDraw() {
    return [...cellElements].every((cell) =>{
        return cell.classList.contains(class_X) || cell.classList.contains(class_O);
    })
}

  