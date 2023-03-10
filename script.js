// selectors
const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles= document.querySelectorAll('.mole');

//variables
let lastHole;
let timeUp = false;
let score = 0;

//random time
function randomTime(min, max){
    return Math.round(Math.random() * (max - min) + min)
}

// random hole
function randomHole(holes){
    const idx = Math.floor(Math.random() * holes.length)
    const hole= holes[idx]
    if(hole === lastHole){
        console.log('thats the same hole');
        return randomHole(holes)
    }
    lastHole = hole
    return hole
}

//peep
function peep(){
    const time = randomTime(200,1000);
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if(!timeUp) peep();
    }, time); 
}

//start game 
function startGame(){
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout( () => timeUp = true , 10000)
}

// bonk
function bonk(e){
    if(!e.isTrusted) return;
    score+=10;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
}

moles.forEach(mole =>mole.addEventListener('click',bonk));



