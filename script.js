const buttons = document.querySelectorAll('* button');
const number7 = document.getElementById('number-7');
const number8 = document.getElementById('number-8');
const number9 = document.getElementById('number-9');
const modulo = document.getElementById('modulo');
const number4 = document.getElementById('number-4');
const number5 = document.getElementById('number-5');
const number6 = document.getElementById('number-6');
const multiply = document.getElementById('multiply');
const number1 = document.getElementById('number-1');
const number2 = document.getElementById('number-2');
const number3 = document.getElementById('number-3');
const minus = document.getElementById('minus');
const dot = document.getElementById('dot');
const number0 = document.getElementById('number-0');
const equals = document.getElementById('equals');
const plus = document.getElementById('plus');
const currentOperation = document.querySelector('.current-operation');
const lastOperation = document.querySelector('.last-operation');

let currentOperator = null;
let isNewExpression = false;
let isNewOperator = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        calculate(button.textContent);
    })
})

function calculate(key){

    if (isNewExpression === true)
    {
        lastOperation.textContent = "";
        isNewExpression = false;
    }

    const parsedKey = parseInt(key);

    if (isNaN(parsedKey))
    {
        if (key !== "=")
        {
            currentOperator = key;
        }
        inputOperator(key);
    }

    else {
        lastOperation.textContent += parsedKey;
        currentOperation.textContent += parsedKey;
    }
}

function inputOperator(key) {

    isNewOperator = true;

    if (key === "CLEAR") {
        currentOperation.textContent = "";
        lastOperation.textContent = "";
    }

    else if (key === ".") {
        lastOperation.textContent += key;
        currentOperation.textContent = "";        
    }

    else if (key === "DELETE") {
        let deleteFirstOne = currentOperation.textContent.slice(0, -1);
        let deleteLastOne = lastOperation.textContent.slice(0, -1);
        lastOperation.textContent = deleteLastOne;
        currentOperation.textContent = deleteFirstOne;
    }

    else if (key === "=") {
        const buffer = lastOperation.textContent;
        evaluateExpression();
        lastOperation.textContent = buffer + " = " + result;
        isNewExpression = true;
    }

    else 
    {
        lastOperation.textContent += " " + key + " ";
        currentOperation.textContent = "";
    }

}

function evaluateExpression() {

    console.log(currentOperator);
    result = 0;
    let numbers = lastOperation.textContent.split(currentOperator);
    if (currentOperator === "÷")
    {
        result = numbers[0] / numbers[1];
    }

    else if (currentOperator === "-")
    {
        result = numbers[0] - numbers[1];
    }

    else if (currentOperator === "+")
    {
        result = numbers[0] + numbers[1];
    }

    else if (currentOperator === "x")
    {
        result = numbers[0] * numbers[1];
    }

    lastOperation.textContent = result;
    currentOperation.textContent = "";
    return result;
}