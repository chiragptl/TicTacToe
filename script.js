let turn = "X"
let isgameover = false;
let isgametie = false;

const changeTurn = ()=>{
    return turn === "X"? "0": "X"
}

const checkWin = ()=>{
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    wins.forEach(e =>{
        if((boxtext[e[0]].innerText !== "") && (boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) ){
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won\nclick reset to play again"
            isgameover = true;
            isgametie = false;

        }
    });
}

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

let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element =>{
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', (event)=>{
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
    })
})

reset.addEventListener('click', ()=>{
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = ""
    });
    turn = "X"; 
    isgameover = false
    isgametie = false
    document.getElementsByClassName("info")[0].innerText  = "Turn for " + turn;
})