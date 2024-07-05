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

function createDrops() {
    const drop = document.createElement('div');
    drop.classList.add('drop');

    const {width, height} = fieldGame.getBoundingClientRect()
    console.log(width, height);

    fieldGame.append(drop);
}

createDrops()