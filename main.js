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
    createDrops()
    if(e.target.classList.contains('drop')) {
        score = score + 1
        console.log(score);
        console.log('click on drop');
        // e.target.remove()
        createDrops()
    }
    if (drop.result === screen.value) {
        console.log(drop.result);
    }
}

fieldGame.addEventListener('click', handlerDropsClick)

// создать капли
function createDrops() {
    const drop = document.createElement('div');
    drop.classList.add('drop');
    const firstNum = document.createElement('div');
    const secondNum = document.createElement('div');
    const operation = document.createElement('div');

    firstNum.innerText = getRandomIntInclusive (1, 10)
    secondNum.innerText = getRandomIntInclusive (1, 10)
    operation.innerText = getRandomSign()
    
    const result = +firstNum.innerText + +secondNum.innerText  // доделать 
    drop.result = result
    console.log(result);

    drop.appendChild(firstNum)
    drop.appendChild(operation)
    drop.appendChild(secondNum)

    return drop
}

// вставить капли
function insertDrops () {
    const drop = createDrops()
    fieldGame.appendChild(drop)
    const dropWidth = drop.offsetWidth
    const areaWidth = fieldGame.offsetWidth
    const maxLeftPosition  = parseInt(100 - dropWidth / areaWidth * 100)
    drop.style.left = getRandomIntInclusive(0, maxLeftPosition) + '%'
}

// рандом знак
function getRandomSign () {
    const arrSigns = ['+', '-']
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

// го
function startGame () {
    btnStartGame.style.display = "none"
    // timerGame()
    createDrops()
    insertDrops()
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



