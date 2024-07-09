import { Calc } from "./srs/components/calc.js";

const calc = new Calc('calc')
console.log(calc);

const screen = document.querySelector('.calc__screen')
const digits = document.querySelectorAll('.digit')
const clearBtn = document.getElementById('clear')
const enterBtn = document.getElementById('enter')
const backspaceBtn = document.getElementById('backspace')

// калькулятор
for (let i = 0; i < digits.length; i++) {
    digits[i].addEventListener('click', function(event) {
        screen.value += event.target.textContent;
    })
}

function clearScreen () {
    screen.value = ''
}

function enterValue () {
    console.log(screen.value);
    clearScreen()
}

function deleteLastymbol () {
    const str = screen.value.slice(0, -1);
    // console.log(str)
    screen.value = str
}

clearBtn.addEventListener('click', clearScreen)
enterBtn.addEventListener('click', enterValue)
backspaceBtn.addEventListener('click', deleteLastymbol)

//капли 
const fieldGame = document.querySelector('.field-game')
const btnStartGame = document.querySelector('.btn-start')
const fieldCalc = document.querySelector('.container-calc')

let score = 0

function handlerDrops(e) {
    if(e.target.classList.contains('drop')) {
        score++
        console.log('click on circle');
        e.target.remove()
        createDrops()
    }
}

function createDrops() {
    const drop = document.createElement('div');
    drop.classList.add('drop');

    const {width, height} = fieldGame.getBoundingClientRect()
    console.log(width, height);

    fieldGame.append(drop);
}

btnStartGame.addEventListener('click', handlerDrops)

// таймер 

btnStartGame.addEventListener('click', startGame)

function startGame () {
    btnStartGame.style.display = "none"
    timerGame()
}

function timerGame () {
    const timer = document.createElement('div');
    timer.classList.add('timer');
    let time = 30; 
    const startGameTimer  = setInterval (() => {console.log('start'),
    timer.textContent = time <=0 ? clearInterval(timer) : time--}, 1000);
    fieldCalc.append(timer);
    // timer.classList.remove('timer');
}
