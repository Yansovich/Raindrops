// секции 
const homePage = document.querySelector('.home-page')
const gamePage = document.querySelector('.game-page')
const finalPage = document.querySelector('.final-page')
const fieldGame = document.querySelector('.container-game')
const fieldCalc = document.querySelector('.container-calc')

// кнопки
const btnStartGame = document.querySelector('.btn-start')
const btnRestart = document.querySelector('.btn-restart')
const btnStartShowRules = document.querySelector('.btn-rules')

// калькулятор 
const inputValue = document.querySelector('.calc__screen')
const enterBtn = document.getElementById('enter')
const clearBtn = document.getElementById('clear')
const backspaceBtn = document.getElementById('backspace')
const buttons = document.querySelectorAll('.digit')

// волны
const wave = document.querySelector('.field-wave')
const secondWave = document.querySelector('.field-wave-2')

// счет и статистика 
const score = document.querySelector('.result-value')
const resultGame = document.querySelector('.result-game')
const amountСorrectAnswers = document.querySelector('.correct-answers')
const amountWrongAnswers = document.querySelector('.wrong-answers')

// переменные
let drops = [];
let correctAnswers = 0;
let wrongAnswers = 0;
let interval = 5500;
let animationDuration = 40000;
let currentScore = 0;
let bonusInterval = 10000;
let bonusProbability = 0.1;
let backgroundAudio;
let intervalId;
let dropOnWave = 0;
let counter = 1; // для счета

// старт
btnStartGame.addEventListener('click', startGame)
btnRestart.addEventListener('click', goToHomePage)
btnStartShowRules.addEventListener('click', startShowRules)

function startGame() {
    homePage.style.display = "none"
    gamePage.classList.add('active');

    startInterval()
    // backgroundSound()
}

function startInterval() {
    intervalId = setInterval(createDrop, interval)
}

function goToHomePage() {
    finalPage.classList.remove('active');
    homePage.style.display = "block"
}

// калькулятор
buttons.forEach(button => {
    button.addEventListener('click', () => {
        inputValue.value += button.dataset.value
    })
})

function clearInputValue() {
    inputValue.value = ''
}

function deleteLastSymbol() {
    inputValue.value = inputValue.value.slice(0, -1);
}

clearBtn.addEventListener('click', clearInputValue)
backspaceBtn.addEventListener('click', deleteLastSymbol)
enterBtn.addEventListener('click', checkResult)

// клавиатура
inputValue.addEventListener('input', (event) => { })

document.addEventListener('keydown', (event) => {
    if (event.key === 'Backspace') {
        deleteLastSymbol()
    } else if (event.key === 'Enter') {
        checkResult()
    } else if (event.key === 'Escape') {
        clearInputValue()
    }
})

//создать капли
function createDrop() {
    const drop = document.createElement('div')
    drop.className = 'drop'

    if (Math.random() < bonusProbability) {
        drop.classList.add('bonus')
    }
    setInterval(() => { }, bonusInterval)

    let firstNumber = getRandomIntInclusive(1, 10)
    let secondNumber

    do {
        secondNumber = Math.floor(Math.random() * firstNumber) + 1;
    } while (firstNumber % secondNumber !== 0);

    const operator1 = '+'
    const operator2 = ['+', '-'][Math.floor(Math.random() * 2)]
    const operator3 = ['+', '-', '*'][Math.floor(Math.random() * 3)]
    const operator4 = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)]

    let selectedOperator

    if (correctAnswers <= 10) {
        selectedOperator = operator1
        drop.innerHTML = `${firstNumber} ${selectedOperator} ${secondNumber}`
    } else if (correctAnswers > 10 && correctAnswers <= 20) {
        selectedOperator = operator2
        drop.innerHTML = `${firstNumber} ${selectedOperator} ${secondNumber}`
    } else if (correctAnswers > 20 && correctAnswers <= 30) {
        selectedOperator = operator3
        drop.innerHTML = `${firstNumber} ${selectedOperator} ${secondNumber}`
    } else if (correctAnswers > 30 && correctAnswers <= 40) {
        selectedOperator = operator4
        drop.innerHTML = `${firstNumber} ${selectedOperator} ${secondNumber}`
    } else if (correctAnswers > 40) {
        firstNumber = getRandomIntInclusive(1, 20);
        do {
            secondNumber = Math.floor(Math.random() * firstNumber) + 1;
        } while (firstNumber % secondNumber !== 0);
        selectedOperator = operator4
        drop.innerHTML = `${firstNumber} ${selectedOperator} ${secondNumber}`
    }

    let answer

    switch (selectedOperator) {
        case '+':
            answer = +firstNumber + +secondNumber
            break
        case '-':
            answer = +firstNumber - +secondNumber
            break
        case '*':
            answer = +firstNumber * +secondNumber
            break
        case '/':
            answer = +firstNumber / +secondNumber
            break
    }

    drop.answer = answer
    console.log(drop.answer)

    drops.push({ element: drop, answer: drop.answer })
    fieldGame.appendChild(drop)

    animateDrop(drop)

    const dropWidth = drop.offsetWidth
    drop.style.left = `${Math.floor(Math.random() * (fieldGame.clientWidth - dropWidth)) + 5}px`
}

// рандом 
function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

//анимация капель
function animateDrop(drop) {
    drop.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(calc(100vh - 150px))' }], {
        duration: animationDuration,
        fill: 'forwards'
    })

    if (dropOnWave < 2) {

        const checkInterval = setInterval(() => {
            if (dropOnWave >= 3) {
                clearInterval(checkInterval);
                finishGame();
                return;
            }

            if (isDropInWave(drop)) {
                drop.remove()
                splashSound()
                dropOnWave = dropOnWave + 1;
                wave.style.height = `${wave.clientHeight + 50}px`;
                secondWave.style.height = `${secondWave.clientHeight + 50}px`;
                clearInterval(checkInterval);
            }
        }, 500);
    } else {
        finishGame();
    }
}

function isDropInWave(drop) {
    const dropRect = drop.getBoundingClientRect();
    const waveRect = wave.getBoundingClientRect();
    return dropRect.bottom >= waveRect.top;
}

// проверить рез
function checkResult() {
    const answer = parseInt(inputValue.value);
    inputValue.value = '';

    const dropIndex = drops.findIndex(drop => drop.answer === answer);

    const hasBonusDrop = drops.some(drop => drop.answer === answer && drop.element.classList.contains('bonus'));

    if (hasBonusDrop) {
        correctAnswers = correctAnswers + 1;

        increaseSpeed()
        increaseScore()

        drops.forEach(drop => {
            drop.element.remove();
        });
        drops = [];
        // console.log('Все элементы drop удалены из-за бонуса');
        bonusSound()
        amountСorrectAnswers.textContent = correctAnswers
    }

    else if (dropIndex !== -1) {
        drops[dropIndex].element.remove();
        drops.splice(dropIndex, 1);
        correctAnswers = correctAnswers + 1;
        increaseSpeed()
        increaseScore()
        winSound()
        amountСorrectAnswers.textContent = correctAnswers
    } else {
        wrongAnswers = wrongAnswers + 1;
        wave.style.height = `${wave.clientHeight + 50}px`;
        secondWave.style.height = `${secondWave.clientHeight + 50}px`;
        console.log("WA", wrongAnswers);

        amountWrongAnswers.textContent = wrongAnswers
        reduceScore()
        mistakeSound()
    }
}

// счет 
function increaseScore() {

    if (correctAnswers === 1) {
        currentScore = 10;
        score.textContent = currentScore;
    } else if (correctAnswers === 2) {
        currentScore = currentScore + counter + 10;
    } else {
        counter = counter + 1
        currentScore = currentScore + counter + 10;
    }
    score.textContent = currentScore;
    resultGame.textContent = currentScore;
}

function reduceScore() {
    currentScore = Math.max(currentScore - counter - 10, 0);
    resultGame.textContent = currentScore;
    score.textContent = currentScore;
}

// увеличить скорость 
function increaseSpeed() {
    const settings = {
        10: { interval: 5000, animationDuration: 35000 },
        20: { interval: 4500, animationDuration: 30000 },
        30: { interval: 4000, animationDuration: 25000 },
        40: { interval: 3500, animationDuration: 20000 },
        50: { interval: 3000, animationDuration: 15000 },
        60: { interval: 2500, animationDuration: 10000 },
        70: { interval: 2000, animationDuration: 9500 },
    };

    if (settings[correctAnswers]) {
        interval = settings[correctAnswers].interval;
        animationDuration = settings[correctAnswers].animationDuration;
    }
}

function finishGame() {
    fieldGame.innerHTML = ''
    stopInterval()
    drops = [];
    correctAnswers = 0;
    wrongAnswers = 0;
    currentScore = 0;
    wave.style.height = '150px'
    secondWave.style.height = '150px'
    stopBackgroundSound()

    gamePage.classList.remove('active');
    finalPage.classList.add('active');
}

function stopInterval() {
    clearInterval(intervalId);
}

// музон 
function backgroundSound() {
    backgroundAudio = new Audio();
    backgroundAudio.preload = 'auto';
    backgroundAudio.src = './assets/audio/backgroundMusic.mp3';
    backgroundAudio.play();
    backgroundAudio.loop = true
}

function stopBackgroundSound() {
    if (backgroundAudio) {
        backgroundAudio.pause();
    }
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

function bonusSound() {
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = './assets/audio/BONUS.mp3';
    audio.play();
}

function splashSound() {
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = './assets/audio/bulk.mp3';
    audio.play();
}

// как играть
let intervalIdForRules // начать показ
let intervalIdForAnswer // для вывода ответа
let intervalIdForFalling // для падения

// интервалы 
function startIntervalForRules() {
    intervalIdForRules = setInterval(createDropForRules, 5500)
}
function stopIntervalForRules() {
    clearInterval(intervalIdForRules);
}
function startIntervalForAnswer() {
    intervalIdForAnswer = setInterval(showAnswer, 5000)
}
function stopIntervalForAnswer() {
    clearInterval(intervalIdForAnswer);
}
function startIntervalForFalling() {
    intervalIdForFalling = setInterval(createDropForRules, 3500)
}
function stopIntervalForFalling() {
    clearInterval(intervalIdForFalling);
}

function startShowRules() {
    homePage.style.display = "none"
    gamePage.classList.add('active');

    startIntervalForRules()
    // backgroundSound()
    drawModal()
    startIntervalForAnswer()
}

function drawButton() {
    const button = document.createElement('button')
    button.classList.add('btn-home')
    fieldCalc.appendChild(button)
    button.textContent = 'To the home page!'
    button.style.margin = '70px 0'
    button.style.width = '250px'

    if (button.addEventListener('click', goToHomePage)) {
        stopIntervalForAnswer()
        button.remove()
    }
}

function showAnswer() {

    drops.forEach(drop => {
        const dropIndex = drop.element.id = Date.now();
        console.log(dropIndex);

        inputValue.value = drop.answer;

        if (+drop.answer === +inputValue.value) {
            drops = drops.filter(d => d.element.id !== drop.element.id);
            drop.element.remove();
        }

        setTimeout(() => inputValue.value = '', 1500)

        correctAnswers = correctAnswers + 1;
        increaseSpeed()
        increaseScore()
        winSound()

        if (correctAnswers === 7) { 
            setTimeout(showDropFall(), 6000)
            setTimeout (() => drawButton(), 2000)
            stopShowRules()
        }
    })
}

function showDropFall() {
    startIntervalForFalling()
    drawModalForFalling()
}

function stopShowRules() {
    inputValue.value = '';
    stopIntervalForRules()
    stopIntervalForAnswer()
    stopBackgroundSound()
}

// модалка 1
function drawModal() {
    const modal = document.createElement('div')
    modal.classList.add('modal')
    fieldGame.appendChild(modal)
    modal.textContent = `Enter your answer in this field! If the answer is correct, 
    the score will increase, if not, it will decrease, and the wave will grow!`
}

// модалка 2
function drawModalForFalling() {
    const modal = document.createElement('div')
    modal.classList.add('modal-falling')
    fieldGame.appendChild(modal)
    modal.textContent = `Enter the answer before the drop touches the water, otherwise the wave will grow! 
    If the drop touches the water, the game is over!`
}

// модалка 3
function drawModalForFinishGame() {
    const modal = document.createElement('div')
    modal.classList.add('modal-finish')
    fieldGame.appendChild(modal)
    modal.textContent = `You lose! Game over :(`
}

// капля для правил
function createDropForRules() {
    const drop = document.createElement('div')
    drop.className = 'drop'
    let firstNumber = getRandomIntInclusive(1, 10)
    let secondNumber

    do {
        secondNumber = Math.floor(Math.random() * firstNumber) + 1;
    } while (firstNumber % secondNumber !== 0);

    const selectedOperator = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)]
    drop.innerHTML = `${firstNumber} ${selectedOperator} ${secondNumber}`
    let answer

    switch (selectedOperator) {
        case '+':
            answer = +firstNumber + +secondNumber
            break
        case '-':
            answer = +firstNumber - +secondNumber
            break
        case '*':
            answer = +firstNumber * +secondNumber
            break
        case '/':
            answer = +firstNumber / +secondNumber
            break
    }

    drop.answer = answer

    drops.push({ element: drop, answer: drop.answer })
    fieldGame.appendChild(drop)
    animateDropForRules(drop)
    const dropWidth = drop.offsetWidth
    drop.style.left = `${Math.floor(Math.random() * (fieldGame.clientWidth - dropWidth)) + 5}px`
}

// анимация для правил
function animateDropForRules(drop) {
    drop.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(calc(100vh - 150px))' }], {
        duration: 10000,
        fill: 'forwards'
    })

    if (dropOnWave < 2) {

        const checkInterval = setInterval(() => {
            if (dropOnWave >= 3) {
                clearInterval(checkInterval)
                drawModalForFinishGame()
                stopIntervalForFalling()
                return;
            }

            if (isDropInWave(drop)) {
                drop.remove()
                splashSound()
                dropOnWave = dropOnWave + 1;
                wave.style.height = `${wave.clientHeight + 50}px`;
                secondWave.style.height = `${secondWave.clientHeight + 50}px`;
                clearInterval(checkInterval);
            }
        }, 500);
    }
}
