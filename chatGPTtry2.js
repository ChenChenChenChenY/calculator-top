document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll('.bt');
    const numberButtons = document.querySelectorAll('.numberBt');
    const functionButtons = document.querySelectorAll('.functionBt');
    const inputNumber = document.querySelector('#inputNumber');
    const output = document.querySelector("#output");

    // Add hover effect to buttons
    buttons.forEach(button => {
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
    });

    // Calculation variables
    let currentInput = '';
    let previousInput = '';
    let inputValue = '';
    let outputValue = '';
    let currentOperator = '';
    let resultDisplayed = false;
    let numberSymbol = 0;
    let numberEqualClick = 0;

    // Clear display contents
    function clear() {
        currentInput = '';
        inputValue = '';
        outputValue = '';
        previousInput = '';
        currentOperator = '';
        inputNumber.innerHTML = '';
        output.innerHTML = '0';
        resultDisplayed = false;
        numberSymbol = 0;
        numberEqualClick = 0;
    }

    // Handle number button click
    function handleNumberClick(bt) {
        bt.addEventListener("click", () => {
            currentInput += bt.textContent;
            inputValue += bt.textContent;
            inputNumber.innerHTML = inputValue;
        });
    }

    // Handle operator button click
    function handleOperatorClick(bt) {
        bt.addEventListener("click", () => {
            if ((numberSymbol > 0 || outputValue !== '') && numberEqualClick === 0) {
                simulateEqualClick();
            }
            currentOperator = bt.textContent;
            if (!resultDisplayed) {
                previousInput = currentInput;
                currentInput = NaN;
                previousInput = handleCalculation();
            } else {
                inputValue = outputValue;
                previousInput = outputValue;
            }

            currentInput = '';
            inputValue += bt.textContent;
            inputNumber.innerHTML = inputValue;
            numberSymbol++;
        });
    }

    // Calculate based on current operator
    function handleCalculation() {
        let temp;
        const a = parseFloat(currentInput);
        const b = parseFloat(previousInput);

        if (isNaN(a) || isNaN(b)) return previousInput;

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
        return temp.toString();
    }

    // Simulate equal button click
    function simulateEqualClick() {
        outputValue = handleCalculation();
        resultDisplayed = true;
        output.innerHTML = outputValue;
        previousInput = outputValue;
    }

    btEqual.addEventListener("click", () => {
        outputValue = handleCalculation();
        resultDisplayed = true;
        output.innerHTML = outputValue;
        previousInput = outputValue;
        numberEqualClick++;
    });

    // Add event listeners to number and function buttons
    numberButtons.forEach(handleNumberClick);
    functionButtons.forEach(handleOperatorClick);
    btClear.addEventListener("click", clear);

    // Calculator functions
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
        return b === 0 ? 'ERROR' : a / b;
    }
    function power(a, b) {
        return a % b;
    }
});