let playerTurn = "X";
let isGameOver = false;
let isGameTie = false;

const changePlayerTurn = ()=>{
    return playerTurn === "X"? "0": "X";
}

//this method check for winner
const checkWinner = ()=>{
    let boxText = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ];

    wins.forEach(e =>{
        if((boxText[e[0]].innerText !== "") && (boxText[e[0]].innerText === boxText[e[1]].innerText) && (boxText[e[2]].innerText === boxText[e[1]].innerText) ){
            document.querySelector('.info').innerText = "Player "+ boxText[e[0]].innerText + " Won\nclick reset to play again";
            isGameOver = true;
            isGameTie = false;
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            document.querySelector(".line").style.width = "20vw";
        }
    });
}

// this method check the game is tir or not
const checkMatchTie = ()=>{
    let tieCounter = 0;
    let boxTexts = document.querySelectorAll('.boxtext');
    Array.from(boxTexts).forEach(element => {
        if(element.innerText !== ''){
            tieCounter += 1;
            if(tieCounter === 9){
                isGameTie = true;
                isGameOver = true;
            }
        }
    });
}

//this code will mark symbol base on click of a player
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element =>{
    let boxText = element.querySelector('.boxtext');
    element.addEventListener('click', ()=>{
        if(!isGameOver){
            if(boxText.innerText === ''){
                boxText.innerText = playerTurn;
                playerTurn = changePlayerTurn();
                checkMatchTie();
                checkWinner();
                if(isGameTie){
                    document.getElementsByClassName("info")[0].innerText  = "Match Tie \nclick reset to play again";
                }
                if(!isGameOver){
                    document.getElementsByClassName("info")[0].innerText  = "Turn for player " + playerTurn;
                }
            }
        }
    });
});

//this code used to reset the gameboard to empty again
reset.addEventListener('click', ()=>{
    let boxTexts = document.querySelectorAll('.boxtext');
    Array.from(boxTexts).forEach(element => {
        element.innerText = "";
    });
    playerTurn = "X"; 
    isGameOver = false;
    isGameTie = false;
    document.querySelector(".line").style.width = "0vw";
    document.getElementsByClassName("info")[0].innerText  = "Turn for player " + playerTurn;
});