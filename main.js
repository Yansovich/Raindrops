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

function deleteLastSymbol () {
    const str = screen.value.slice(0, -1);
    screen.value = str
}

clearBtn.addEventListener('click', clearScreen)
enterBtn.addEventListener('click', enterValue)
backspaceBtn.addEventListener('click', deleteLastSymbol)

//капли 
const fieldGame = document.querySelector('.field-game')
const btnStartGame = document.querySelector('.btn-start')
const fieldCalc = document.querySelector('.container-calc')
const containerNums = document.getElementById('container-nums')

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
    
    const size = drop.style.width = drop.style.height
  
    const {width, height} = fieldGame.getBoundingClientRect()

    const x = getRandomIntInclusive(0, width - size)
    // const y = getRandomIntInclusive(0, height - size)

    // drop.style.top = y + 'px'
    drop.style.left = x + 'px'

    fieldGame.append(drop);
    drop.append(containerNums);
    containerNums.style.display = 'block'
    generateSymbols()
}

// вставить цифры 
const num1 = document.querySelector('.num1')
const num2 = document.querySelector('.num2')
const sign = document.querySelector('.sign')

const randonSymbols = {
    randomNum1: '', 
    randomNum2: '', 
    randomSign: '', 
}

function generateSymbols () {
    const number1 = randonSymbols.randomNum1 = getRandomNum()
    const number2 = randonSymbols.randomNum2 = getRandomNum()
    const signR = randonSymbols.randomSign = getRandomSign()
    
    num1.insertAdjacentHTML('afterBegin', number1)
    num2.insertAdjacentHTML('afterBegin', number2)
    sign.insertAdjacentHTML('afterBegin', signR)

    // clearValue()
}

function clearValue () {
    num1.innerHTML = ''
    num2.innerHTML = ''
    sign.innerHTML = ''
}

function getRandomNum () {
    const randomNum = getRandomIntInclusive (1, 10)
    return randomNum
}

function getRandomSign () {
    const arrSigns = ['+', '-', '/', '*']
    const randomItem = arrSigns[Math.floor(Math.random() * arrSigns.length)];
    return randomItem
}


// рандом число
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



