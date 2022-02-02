let turn = "X";
let isgameover = false;
let isgametie = false;

const changeTurn = ()=>{
    return turn === "X"? "0": "X";
}

//this method check for winner
const checkWin = ()=>{
    let boxtext = document.getElementsByClassName('boxtext');
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
        if((boxtext[e[0]].innerText !== "") && (boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) ){
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won\nclick reset to play again";
            isgameover = true;
            isgametie = false;
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            document.querySelector(".line").style.width = "20vw";
        }
    });
}

// this method check the game is tir or not
const checkTie = ()=>{
    let tiecounter = 0;
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        if(element.innerText !== ''){
            tiecounter += 1;
            if(tiecounter === 9){
                isgametie = true;
                isgameover = true;
            }
        }
    });
}

//this code will mark symbol base on click of a player
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element =>{
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', ()=>{
        if(!isgameover){
            if(boxtext.innerText === ''){
                boxtext.innerText = turn;
                turn = changeTurn();
                checkTie();
                checkWin();
                if(isgametie){
                    document.getElementsByClassName("info")[0].innerText  = "Match Tie \nclick reset to play again";
                }
                if(!isgameover){
                    document.getElementsByClassName("info")[0].innerText  = "Turn for " + turn;
                }
            }
        }
    });
});

//this code used to reset the gameboard to empty again
reset.addEventListener('click', ()=>{
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = ""
    });
    turn = "X"; 
    isgameover = false
    isgametie = false
    document.querySelector(".line").style.width = "0vw";
    document.getElementsByClassName("info")[0].innerText  = "Turn for " + turn;
})