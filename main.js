const screen = document.querySelector('.calc__screen')
const digits = document.querySelectorAll('.digit')
const clearBtn = document.getElementById('clear')
const enterBtn = document.getElementById('enter')
const backspaceBtn = document.getElementById('backspace')
const scoreGame = document.querySelector('.result-value')

const homePage = document.querySelector('.home-page')
const gamePage = document.querySelector('.container-game')
const finalPage = document.querySelector('.final-page')

// калькулятор
for (let i = 0; i < digits.length; i++) {
    digits[i].addEventListener('click', function (event) {
        screen.value += event.target.textContent;
    })
}

let result = '';
let score = 0;
const drop = document.createElement('div');
const arrSigns = ['+', '-', '*', '/']

function clearScreen() {
    screen.value = ''
}

function enterValue() {
    // console.log(screen.value);
    checkRightAnswer()
    clearScreen()
}

function deleteLastSymbol() {
    const str = screen.value.slice(0, -1);
    screen.value = str
}

clearBtn.addEventListener('click', clearScreen)
enterBtn.addEventListener('click', enterValue)
backspaceBtn.addEventListener('click', deleteLastSymbol)

//капли 
// const fieldGame = document.querySelector('.field-game')
const btnStartGame = document.querySelector('.btn-start')
const fieldCalc = document.querySelector('.container-calc')
const containerNums = document.getElementById('container-nums')

// создать капли
function createDrops() {
    drop.classList.add('drop');
    const firstNum = document.createElement('div');
    const secondNum = document.createElement('div');
    const operator = document.createElement('div');

    firstNum.innerText = getRandomIntInclusive(1, 10)
    secondNum.innerText = getRandomIntInclusive(1, 10)
    operator.innerText = getRandomSign()

    if (+firstNum.innerText < +secondNum.innerText && (operator.innerText === '-' || operator.innerText === '/')) {
        [firstNum.innerText, secondNum.innerText] = [secondNum.innerText, firstNum.innerText]
    }

    if (operator.innerText === '/' && +firstNum.innerText % +secondNum.innerText != 0) {
        firstNum.innerText -= firstNum.innerText % secondNum.innerText
    }

    switch (operator.innerText) {
        case '+': result = +firstNum.innerText + +secondNum.innerText
            break
        case '-': result = +firstNum.innerText - +secondNum.innerText
            break
        case '*': result = +firstNum.innerText * +secondNum.innerText
            break
        case '/': result = +firstNum.innerText / +secondNum.innerText
            break
    }

    drop.result = result

    drop.appendChild(firstNum)
    drop.appendChild(operator)
    drop.appendChild(secondNum)

    return drop
}

// вставить капли
function insertDrops() {
    gamePage.appendChild(drop)
    const dropWidth = drop.offsetWidth
    const areaWidth = gamePage.offsetWidth
    const maxLeftPosition = parseInt(100 - dropWidth / areaWidth * 100)
    drop.style.left = getRandomIntInclusive(0, maxLeftPosition) + '%'
}

function deleteDrops() {
    // drop.classList.add('hide');
    drop.remove()
}

function showDrops() {
    drop.classList.add('show');
}

let trueResult = 0;
let wrongResult = 0;
const resultGame = document.querySelector('.result-game')

// проверять рез
const sectionGame = document.querySelector('.game-page')

function checkRightAnswer() {

    drop.result = result

    if (+result === +screen.value) {
        score = score + 10;
        trueResult = trueResult + 1;
        scoreGame.textContent = score
        resultGame.textContent = score
        deleteDrops()
        winSound()

        // console.log(1000000);   
        const drop = document.createElement('div');     
        createDrops()  /// ????   

        // console.log(createDrops()); 
        insertDrops()
        // showDrops()

    } else {
        score = score - 5
        wrongResult = wrongResult + 1;
        scoreGame.textContent = score
        resultGame.textContent = score

        if (score < 0) {
            score = 0
            scoreGame.textContent = 0
            resultGame.textContent = 0
        }
        mistakeSound()
        growWave()

        if (+wrongResult === 3) {
            callModal()
            sectionGame.classList.add('up');
        }
    }
}

function callModal() {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    gamePage.appendChild(modal)
    console.log(modal);

}

// рандом знак
function getRandomSign() {
    const randomItem = arrSigns[Math.floor(Math.random() * arrSigns.length)];
    return randomItem
}

// рандом число
function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

// старт
btnStartGame.addEventListener('click', startGame)

// го
function startGame() {
    homePage.classList.add('up');
    // timerGame()
    createDrops()
    insertDrops()
    // backgroundSound()
}

// музон 
function backgroundSound() {
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = './assets/audio/backgroundMusic.mp3';
    audio.play();
}

function mistakeSound() {
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = './assets/audio/mistake.mp3';
    audio.play();
}

function winSound() {
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = './assets/audio/win.mp3';
    audio.play();
}

// волна
const firstWave = document.querySelector('.field-wave')
const secondWave = document.querySelector('.field-wave-2')

function growWave() {
    const waveHeight = firstWave.offsetHeight
    const newHeight = waveHeight + 10

    firstWave.style.height = newHeight + 'px'
    secondWave.style.height = newHeight + 'px'
}

// домой
const btnRestart = document.querySelector('.btn-restart')

btnRestart.addEventListener('click', goToHomePage)

function goToHomePage() {
    sectionGame.style.display = "none"
    finalPage.style.display = "none"
    homePage.classList.remove('up');
    sectionGame.classList.remove('up');

}







// не работает
function deleteHiddenDrop() {
    const positionDrop = drop.getBoundingClientRect()
    const positionWave = firstWave.getBoundingClientRect()

    console.log(positionDrop);
    console.log(positionWave);

    if (positionDrop.y + positionDrop.height >= positionWave.y) {
        deleteDrops()
        createDrops()
    }
}
deleteHiddenDrop()

// таймер
function timerGame() {
    const timer = document.createElement('div');
    timer.classList.add('timer');
    let time = 10;
    const startGameTimer = setInterval(() => {
        console.log('start'),
        timer.textContent = time <= 0 ? clearInterval(timer) : time--
    }, 1000);
    fieldCalc.append(timer);
    timer.classList.remove('timer');
}
