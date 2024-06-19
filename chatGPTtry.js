// Define everything
const bt1 = document.querySelector("#bt1");
const bt2 = document.querySelector("#bt2");
const bt3 = document.querySelector("#bt3");
const bt4 = document.querySelector("#bt4");
const bt5 = document.querySelector("#bt5");
const bt6 = document.querySelector("#bt6");
const bt7 = document.querySelector("#bt7");
const bt8 = document.querySelector("#bt8");
const bt9 = document.querySelector("#bt9");
const bt0 = document.querySelector("#bt0");
const btPower = document.querySelector("#btPower");
const btClear = document.querySelector("#btClear");
const btDel = document.querySelector("#btDel");
const btAdd = document.querySelector("#btAdd");
const btMinus = document.querySelector("#btMinus");
const btMultiply = document.querySelector("#btMultiply");
const btDivide = document.querySelector("#btDivide");
const btDot = document.querySelector("#btDot");
const btEqual = document.querySelector("#btEqual");
const inputSymbol = document.querySelector('#inputSymbol');
const inputNumber = document.querySelector('#inputNumber');
const output = document.querySelector("#output");
const buttons = document.querySelectorAll('.bt');
const numberButtons = document.querySelectorAll('.numberBt');
const functionButtons = document.querySelectorAll('.functionBt');

let currentInput = '';
let currentOperator = '';
let previousInput = '';
let resultDisplayed = false;

// Clear display contents
function clear() {
    currentInput = '';
    currentOperator = '';
    previousInput = '';
    inputSymbol.innerHTML = '';
    inputNumber.innerHTML = '';
    output.innerHTML = '';
}

// Mouse hovers and change button color
function addHoverEffect(button) {
    button.addEventListener("mouseover", () => {
        button.style.background = 'linear-gradient(145deg, rgb(150, 200, 255), rgb(125, 208, 255))';
    });
    button.addEventListener("mouseout", () => {
        button.style.background = 'linear-gradient(125deg, rgb(255, 255, 255), rgb(231, 231, 231))';
    });
}
buttons.forEach(addHoverEffect);

function generateInputNumber(bt) {
    bt.addEventListener("click", () => {
        if (resultDisplayed) {
            currentInput = bt.textContent;
            resultDisplayed = false;
        } else {
            currentInput += bt.textContent;
        }
        updateDisplay();
    });
}

function generateInputSymbol(bt) {
    bt.addEventListener("click", () => {
        if (currentInput === '') return;

        if (previousInput !== '') {
            calculateResult();
        }

        currentOperator = bt.textContent;
        previousInput = currentInput;
        currentInput = '';
        updateDisplay();
    });
}

numberButtons.forEach(generateInputNumber);
functionButtons.forEach(generateInputSymbol);
btClear.addEventListener("click", () => clear());

btEqual.addEventListener("click", () => calculateResult());

btDel.addEventListener("click", () => {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
});

// Define all calculator functions
function add(a, b) {
    return a + b;
}
function minus(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    return a / b;
}
function power(a, b) {
    return a % b;
}

function calculateResult() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (currentOperator) {
        case '+':
            result = add(prev, current);
            break;
        case '-':
            result = minus(prev, current);
            break;
        case 'x':
            result = multiply(prev, current);
            break;
        case '/':
            result = divide(prev, current);
            break;
        case '%':
            result = power(prev, current);
            break;
        default:
            return;
    }

    currentInput = result.toString();
    previousInput = '';
    currentOperator = '';
    resultDisplayed = true;
    updateDisplay();
}

function updateDisplay() {
    inputNumber.innerHTML = currentInput;
    output.innerHTML = previousInput + ' ' + currentOperator;
}