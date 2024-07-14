// import { Calc } from "./srs/components/calc.js"

// const calc = new Calc ('.calc__screen', '.digit', 'clear', 'enter', 'backspace')
// console.log(calc);

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

function handlerDropsClick (e) {
    if(e.target.classList.contains('drop')) {
        score = score + 1
        // console.log(score);
        // console.log('click on drop');
        e.target.remove()
        createDrops()
    }
}

fieldGame.addEventListener('click', handlerDropsClick)

// создать капли
function createDrops() {
    const drop = document.createElement('div');
    drop.classList.add('drop');
    
    const size = 100 + 'px'
    drop.style.width = drop.style.height = size 
    const top = drop.style.top = 30 + 'px'
    const {left, right} = drop.style.left = drop.style.right = 10 + 'px'
    
    const {width, height} = fieldGame.getBoundingClientRect()
    // console.log(width, height);

    const x = getRandomIntInclusive(0, width - size)
    const y = getRandomIntInclusive(0, height - size)

    drop.style.top = y + 'px'
    drop.style.left = x + 'px'

    fieldGame.append(drop);
    drop.append(containerNums);
    generateNums()
}

function getRandomIntInclusive (min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); 
}

// таймер 
btnStartGame.addEventListener('click', startGame)

function startGame () {
    btnStartGame.style.display = "none"
    timerGame()
    createDrops()
}

function timerGame () {
    const timer = document.createElement('div');
    timer.classList.add('timer');
    let time = 10; 
    const startGameTimer  = setInterval (() => {console.log('start'),
    timer.textContent = time <=0 ? clearInterval(timer) : time--}, 1000);
    fieldCalc.append(timer);
    // timer.classList.remove('timer');
}

// вставить цифры 
const containerNums = document.querySelector('.container-nums')
const num1 = document.querySelector('.num1')
const num2 = document.querySelector('.num2')
const sign = document.querySelector('.sign')

function generateNums () {
        if(containerNums.classList.contains('num1')) {   
            getNum()
        }
        if(containerNums.classList.contains('num2')) {   
            getNum()
        }
        if(containerNums.classList.contains('sign')) {   
            getSign()
        }
    }

function getNum () {
    const num = document.createElement('p');
    num1.classList.add('num');
    p.textContent = getRandomIntInclusive (1, 10)
}

function getSign () {
    const arrSigns = ['+', '-', '/', '*']
    const sign = document.createElement('p');
    num1.classList.add('sign');
    const randomItem = arrSigns[Math.floor(Math.random() * arrSigns.length)];
    p.textContent = randomItem
}

