const screen = document.querySelector('.calc__screen')
const digits = document.querySelectorAll('.digit')
const clearBtn = document.getElementById('clear')
const enterBtn = document.getElementById('enter')
const backspaceBtn = document.getElementById('backspace')

export class Calc {

    constructor(id) {
        this.componet = document.getElementById(id)
    }
    
    getBtn () {
     for (let i = 0; i < digits.length; i++) {
        digits[i].addEventListener('click', function(event) {
            screen.value += event.target.textContent;
        })
    }

    const a = clearBtn.addEventListener('click', clearScreen);
    const b = enterBtn.addEventListener('click', enterValue);
    const с = backspaceBtn.addEventListener('click', deleteLastymbol);
}
  
}

function clearScreen () {
    screen.value = ''
}

function enterValue () {
    console.log(screen.value);
}

function deleteLastymbol () {
    const str = screen.value.slice(0, -1);
    screen.value = str
}
