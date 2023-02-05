const inputDisplay = document.querySelector('#input-display');
const outputDisplay = document.querySelector('#output-display');
const numberBtns = document.querySelectorAll('.number-btn');
const operationBtns = document.querySelectorAll('.operation-btn');
const equalsKey = document.querySelector('#equals-key');

function add (a, b) {
    return (+a + +b).toString();
}

function subtract (a, b) {
    return (+a - +b).toString();
}

function multiply (a, b) {
    return (+a * +b).toString();
}

function divide (a, b) {
    return +b === 0 ?
    "Division by zero":
    (+a / +b).toString();
}

// calculate() takes 3 strings as arguments: 'integer', 'operator', 'integer'
// and returns the result as a string
function calculate(a, operator, b) {
    switch (operator) {
        case '+':
            return add (a, b);
            break;
        case '-':
            return subtract (a, b);
            break;
        case '*':
            return multiply (a, b);
            break;
        case '/':
            return divide (a, b);
            break;
    }
}

// operation pair - a, operator, b  where all values are strings
// second number - b
// first number - a

// Calculator logic:
// Store user input as string, every input will append to this string until an operator is used
    // display the input string for every input except for the operator input.
// Create 3 variables for 'a, operator, b' where a and b are strings to be converted to integers.
    // The use of an operator will assign the user input string to the appropriate variable then clear it.
// After the 3 variables are assigned (operation pair), call operate() using 'equals' key
    // NOTE: 'equals' key will have to store the current user input string to 'b' before operating
    // All variables are strings, temporarily convert numbers to ints in calculate()
    // Account for division by zero
    // Prevent operators from being repeated
        // Can check for an existing operator when pressing an operator button
    // allow only one decimal per number (perform check when decimal button pressed)
    // Operation occurs when the 'equals' button is pressed, however using an operator after
    // inputing a second number (b) will act like an 'equals' button and store that
    // operator for the next result.
// Display the result and store it as the first number (a) for the next calc.

let isOperationPair = false;
let isSecondNumber = false;
let existingOperator = false;
let existingDecimal = false;
// values to be used in calculate()
let a = "";
let operator = "";
let b = "";

let userInput = "";
//let inputDisplayValue = '';



// Append input to 'userInput' and update display
function displayAndAppend(event) {
    userInput = userInput + event.currentTarget.textContent;
    // update display
    inputDisplay.textContent = userInput;
}

// function for operationBtns, store user input to appropriate variable then clear
    //isOperationPair becomes true when a existing operator is present and then a number is inputted.
function storeValue(event) {
    if (isOperationPair) {
        isOperationPair = false;
        // call operation func etc etc
        operate();
        operator = event.currentTarget.textContent;
        existingOperator = true;
    }
    else if (isSecondNumber) {
        b = userInput;
        userInput = '';
        operator = event.currentTarget.textContent;
        console.log(operator);
        console.log(b);
    }
    else {
        a = userInput;
        userInput = '';
        operator = event.currentTarget.textContent;
        console.log(operator);
        console.log(a);
    }
}



numberBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        displayAndAppend(e);
    });
});

operationBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        storeValue(e);
    });
});



function operate() {
    a = calculate(a, operator, b);
    inputDisplay.textContent = a;

    operator = '';
    userInput = '';
    b = '';
    isOperationPair = false;
    isSecondNumber = false;
    existingOperator = false;
    existingDecimal = false;
}

equalsKey.addEventListener('click', (e) => {
    b = userInput;
    operate();
});
