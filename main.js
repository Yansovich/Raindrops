const screen = document.querySelector('.calc__screen')
const digits = document.querySelectorAll('.digit')
const clearBtn = document.getElementById('clear')
const enterBtn = document.getElementById('enter')
const backspaceBtn = document.getElementById('backspace')
const scoreGame = document.querySelector('.result-value')

// калькулятор
for (let i = 0; i < digits.length; i++) {
    digits[i].addEventListener('click', function(event) {
        screen.value += event.target.textContent; 
    })
}

let result = ''
let score = 0
const drop = document.createElement('div');
const arrSigns = ['+', '-']

function clearScreen () {
    screen.value = ''
}

function enterValue () {
    // console.log(screen.value);
    checkRightAnswer()
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

function checkRightAnswer () {

    drop.result = result  
    
    if (+result === +screen.value) {
        score = score + 1      
        scoreGame.textContent = score 
        deleteDrops()
        winSound()

        createDrops()  /// ????    
    } else {
        mistakeSound()
    }
}

// создать капли
function createDrops() {
    drop.classList.add('drop');
    const firstNum = document.createElement('div');
    const secondNum = document.createElement('div');
    const operation = document.createElement('div');

    firstNum.innerText = getRandomIntInclusive (1, 10)
    secondNum.innerText = getRandomIntInclusive (1, 10)
    operation.innerText = getRandomSign()
    
    switch (operation.innerText) {
        case '+': result = +firstNum.innerText + +secondNum.innerText 
        break
        case '-': result = +firstNum.innerText - +secondNum.innerText 
        break
    }
    
    drop.result = result
   
    drop.appendChild(firstNum)
    drop.appendChild(operation)
    drop.appendChild(secondNum)

    return drop
}

// вставить капли
function insertDrops () {
    fieldGame.appendChild(drop)
    const dropWidth = drop.offsetWidth
    const areaWidth = fieldGame.offsetWidth
    const maxLeftPosition  = parseInt(100 - dropWidth / areaWidth * 100)
    drop.style.left = getRandomIntInclusive(0, maxLeftPosition) + '%'
}

function deleteDrops() {
    drop.classList.add('hide');
}

// рандом знак
function getRandomSign () {
    const randomItem = arrSigns[Math.floor(Math.random() * arrSigns.length)];
    return randomItem
}

// рандом число
function getRandomIntInclusive (min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); 
}

// менять числа
function randomExpression () {
    let firstNum = getRandomIntInclusive (1, 10)
    let secondNum = getRandomIntInclusive (1, 10)
    let operator = ''

    if (firstNum < secondNum && (operator === '-' || operator === '/')) {
        [firstNum, secondNum] = [secondNum, firstNum]
    }
    if (operator === '/' && firstNum % secondNum !=0) {
        firstNum -= firstNum % secondNum
    }

    return (firstNum, secondNum, operator)
}

// старт
btnStartGame.addEventListener('click', startGame)

// го
function startGame () {
    btnStartGame.style.display = "none"
    // timerGame()
    createDrops()
    insertDrops()
}

// таймер
function timerGame () {
    const timer = document.createElement('div');
    timer.classList.add('timer');
    let time = 10; 
    const startGameTimer  = setInterval (() => {console.log('start'),
    timer.textContent = time <=0 ? clearInterval(timer) : time--}, 1000);
    fieldCalc.append(timer);
    // timer.classList.remove('timer');
}

// музон 
function mistakeSound () {
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = './msc/mistake.mp3';
    audio.play();
}

function winSound () {
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = './msc/win.mp3';
    audio.play();
}