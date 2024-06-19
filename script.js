//define everything
const bt1 = document.querySelector("#bt1")
const bt2 = document.querySelector("#bt2")
const bt3 = document.querySelector("#bt3")
const bt4 = document.querySelector("#bt4")
const bt5 = document.querySelector("#bt5")
const bt6 = document.querySelector("#bt6")
const bt7 = document.querySelector("#bt7")
const bt8 = document.querySelector("#bt8")
const bt9 = document.querySelector("#bt9")
const bt0 = document.querySelector("#bt0")
const btPower = document.querySelector("#btPower")
const btClear = document.querySelector("#btClear")
const btDel = document.querySelector("#btDel")
const btAdd = document.querySelector("#btAdd")
const btMinus = document.querySelector("#btMinus")
const btMultiply = document.querySelector("#btMultiply")
const btDivide = document.querySelector("#btDivide")
const btDot = document.querySelector("#btDot")
const btEqual = document.querySelector("#btEqual")
const inputNumber = document.querySelector('#inputNumber')
const output = document.querySelector("#output")
const buttons = document.querySelectorAll('.bt')
const numberButtons = document.querySelectorAll('.numberBt')
const functionButtons = document.querySelectorAll('.functionBt')

//mouse hovers and change button color
function addHoverEffect(button) {
    button.addEventListener("mouseover", () => {
        button.style.background = 'linear-gradient(145deg, rgb(150, 200, 255), rgb(125, 208, 255))';
    });
    button.addEventListener("mousedown", () => {
        button.style.background = 'linear-gradient(145deg, rgb(255, 200, 255), rgb(125, 208, 255))';
    });
    button.addEventListener("mouseup", () => {
        button.style.background = 'linear-gradient(145deg, rgb(150, 200, 255), rgb(125, 208, 255))';
    });
    button.addEventListener("mouseout", () => {
        button.style.background = 'linear-gradient(125deg, rgb(255, 255, 255), rgb(231, 231, 231))';
    });
}
buttons.forEach(addHoverEffect);

//CALCULATION
let currentInput = '';
let previousInput = '';
let inputValue = ''
let outputValue = ''
let currentOperator = '';
let resultDisplayed = false;
let numberSymbol = 0
let numberEqualClick = 0


// clear display contents
function clear() {
    currentInput = ''
    inputValue = ''
    outputValue = ''
    previousInput = ''
    currentOperator
    inputNumber.innerHTML = ''
    output.innerHTML = ''
    resultDisplayed = false
    numberSymbol = 0
    numberEqualClick = 0
}

function clickNumber(bt) {
    bt.addEventListener("click", () => {
        currentInput += bt.textContent
        inputValue += bt.textContent
        inputNumber.innerHTML = inputValue
    })
}

//当按下运算符号按钮时，先检测结果是否已经显示，如果显示了，把结果的值交给运算的
//格子，如果没有显示，那就把现在的值交给previousInput暂存
function clickSymbol(bt) {
    bt.addEventListener("click", () => {
        if ((numberSymbol > 0 || !outputValue == '') && numberEqualClick == 0) {
            simulateEqualClick()
        }
        currentOperator = bt.textContent
        if (!resultDisplayed) { //还没显示结果
            previousInput = currentInput
            currentInput = NaN
            previousInput = handleCalculation()
        } else { //已经显示了结果
            inputValue = outputValue
            previousInput = outputValue
        }

        currentInput = 0
        inputValue += bt.textContent
        inputNumber.innerHTML = inputValue
        numberSymbol++
    })
}

//根据现在符号进行计算，在结果出显示结果，把结果赋值给previousInput
function handleCalculation() {
    let temp;
    let a = parseFloat(currentInput)
    let b = parseFloat(previousInput)

    if (isNaN(currentInput) || isNaN(previousInput)) return previousInput;

    switch (currentOperator) {
        case '+':
            temp = add(a, b);
            break;
        case '-':
            temp = minus(b, a);
            break;
        case 'x':
            temp = multiply(a, b);
            break;
        case '/':
            temp = divide(b, a);
            break;
        case '%':
            temp = power(b, a);
            break;
        default:
            return;
    }
    return temp.toString()
}

function simulateEqualClick() {
    outputValue = handleCalculation()
    resultDisplayed = true
    output.innerHTML = outputValue
    previousInput = outputValue
}

btEqual.addEventListener("click", () => {
    outputValue = handleCalculation()
    resultDisplayed = true
    output.innerHTML = outputValue
    previousInput = outputValue
    numberEqualClick++
})

// btDel.addEventListener("click", ()=>{
//     currentInput.
// })

numberButtons.forEach(clickNumber)
functionButtons.forEach(clickSymbol)
btClear.addEventListener("click", () => clear())

// define all calculator functions
function add(a, b) {
    return a + b
}
function minus(a, b) {
    return a - b
}
function multiply(a, b) {
    return a * b
}
function divide(a, b) {
    if (b == 0) {
        return 'ERROR'
    }
    return a / b
}
function power(a, b) {
    return a % b
}

