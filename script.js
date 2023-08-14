const buttons = document.querySelectorAll('* button');
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

    
    if (isNewOperator === true)
    {
        evaluateExpression();
        isNewOperator = false;
    }

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
        lastOperation.textContent = buffer;
    }

    else 
    {
        isNewOperator = true;
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

// when  a new operator is used, we want to use the evaluate function and display the result