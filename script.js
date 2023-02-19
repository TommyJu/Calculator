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
        // Account for division by zero
        // Prevent the same operators from being repeated (compare with stored variable)
        // Can check for an existing operator when pressing an operator button
        // allow only one decimal per number (perform check when decimal button pressed)

// Create 3 variables for 'a, operator, b' where a and b are strings to be temporarily converted to integers.
    
// The use of an operator will assign the user input string to the appropriate variable then clear it.
        
        // There are three cases:
            // 1. Using an operator before 'a' just stores the operator
            // 2. Using an operator in between a number pair assigns userInput to 'a', stores the operator, and clears userInput
                // determine in between number pair based on non empty 'a' or userInput 
            // 3. Using an operator after a number pair stores the operator and works like an equals button
                // Store operator, then call operate()
                    // determine number pair by non empty 'a', 'operator', and userInput
        
            // operator variable stays the same unless cleared or another operator is assigned


// call operate() using 'equals' button
    
        // There are multiple cases for operate ():
        // In all cases: clear userInput before performing the next operation
            // pressing = with only an operator does nothing
            // pressing = without an assigned operator stores 'a' and returns 'a'
            // Pressing = with only one number present and an operator will perform the operation with the first number as the second
                // repeatedly pressing = will constantly perform the same operation with 'a' as a running total
            // Pressing = with an operation pair performs the operation with the select a and b values and operator is stored
            // Pressing = after selecting an operator then a number will simply return the number, assign it to b, and store the operator
            
            // 1. If there is only an operator, clear operator and do nothing
            // 2. In the absence of an operator and a 'b' value, assign userInput to 'a' if userInput is non-empty
                // If userInput is empty, simply return 'a' which is initially set to "0"
            // 3. If there is no 'b' value, a = b, calculate and assign result to 'a', then display 'a'
                // ie: userInput === '' when pressing enter
            // 4. If there is no 'a' value, return b, keep stored operator, and assign 'b' to 'a'
            // 5. if you have 'a', 'operator', and 'b', pressing '=' will assign userInput to 'b', then assign result to 'a' and return 'a'
                // ie: userInput !== '' when pressing =
            // operator variable stays the same unless cleared or another variable is pressed


// values to be used in calculate()
let a = "0";
let operator = "";
let b = "0";

let userInput = "";




// Append input to 'userInput' and update display
function displayAndAppend(event) {
    userInput = userInput + event.currentTarget.textContent;
    // update display
    inputDisplay.textContent = userInput;
}

// store operator and userInput to appropriate variables
function storeValue(event) {
    
    // case 1/store value
    operator = event.currentTarget.textContent;

    // case #3
    if (a !== '' && operator !== '' && userInput !== '') {
        operate();
        console.log('case 3');
    }
    
    // case #2
    else if (a !== '' || userInput !== '') {
        a = userInput;
        userInput = '';
        console.log('case 2');
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

    // case 1
    if (userInput === '' && a === '' && operator !== '' && b === '') {
        operator = '';
    }

    // case 2
    else if (operator === '' && b === '') {
        if (userInput !== '') {
            a = userInput;
            inputDisplay.textContent = a;
        }
        
        else {
            inputDisplay.textContent = a;
        }
        
    }

    // case 3
    else if () {}

    // reset userInput for next operation
    console.log('operation complete');
    console.log(a);
    console.log(operator);
    console.log(b);
    
    userInput = '';
}

equalsKey.addEventListener('click', (e) => {
    b = userInput;
    operate();
});
