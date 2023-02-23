const display = document.querySelector('#display');
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
        
        // There are three cases for storeValue():
            // 1. Using an operator before 'a' just stores the operator
            // 2. Using an operator in between a number pair stores the operator, and clears userInput
            // 2.5. Assign userInput to 'a' IF 'a' is empty
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
                // If userInput is empty, simply return 'a' 
            // 3. In the absence of only a 'b' value, a = b, calculate and assign result to 'a', then display 'a'
                // For 'b' to be empty, userInput === '' after 'a' is stored and an operator is pressed.
            // 4. If there is no 'a' value and assigned b value, keep stored operator, and assign/display 'userInput' to 'a' and 'b'
                // Note: it is impossible to have an empty 'a' value if there is an assigned b value.
            // 5. if you have 'a', 'operator', and a non-empty userInput, pressing '=' will assign userInput to 'b', then assign result to 'a' and return 'a'
                // ie: userInput !== '' when pressing =
            // 6. If you have 'a', 'operator', 'b', and an empty userInput, pressing '=' will peform a calculation and assign/display result to 'a'
            // operator variable stays the same unless cleared or another variable is pressed
            // 7. If you have a non-empty 'a', 'operator', 'b', 'userInput', overwrite 'b' with 'userInput' and assign/display calculation to 'a'


// values to be used in calculate()
let a = "";
let operator = "";
let b = "";

let userInput = "";




// Append input to 'userInput' and update display
function displayAndAppend(event) {
    userInput = userInput + event.currentTarget.textContent;
    // update display
    display.textContent = userInput;
}

// store operator and userInput to appropriate variables
function storeValue(event) {
    
    // case 1/store value
    operator = event.currentTarget.textContent;

    // case #3
    if (a !== '' && operator !== '' && userInput !== '') {
        operate();
        console.log('storeValue case 3');
    }
    
    // case #2
    else if (userInput !== '') {
        a = userInput;
        userInput = '';
        console.log('storeValue case 2');
    }

    // case #2.5
    else if (a !== '') {
        userInput = '';
    } 

    else {
        console.log("storeValue case 1");
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
    if (a === '' && operator !== '' && b === '' && userInput === '') {
        operator = '';
        console.log("operate case 1");
    }

    // case 2
    else if (operator === '' && b === '') {
        if (userInput !== '') {
            a = userInput;
            display.textContent = a;
            console.log("operate case 2");
        }
        
        else {
            display.textContent = a;
            console.log("operate case 2 (else)");
        }
        
    }

    // case 3
    else if (a !== '' && operator !== '' && b === '' && userInput === '') {
        b = a;
        a = calculate(a, operator, b);
        display.textContent = a;
        console.log("operate case 3");

    }

    // case 4
    else if (a === '' && b === '' && operator !== '' && userInput !== '') {
        a = b = userInput;
        display.textContent = userInput;
        console.log("operate case 4");
    }

    // case 5
    else if (a !== '' && operator !== '' && b === '' && userInput !== '') {
        b = userInput;
        a = calculate(a, operator, b);
        display.textContent = a;
        console.log("operate case 5");
    }

    // case 6
    else if (a !== '' && operator !== '' && b !== '' && userInput === '') {
        a = calculate(a, operator, b);
        display.textContent = a;
        console.log('operate case 6');
    }

    // case 7
    else if (a !== '' && operator !== '' && b !== '' && userInput !== '') {
        b = userInput;
        a = calculate(a, operator, b);
        display.textContent = a;
        console.log('operate case 7');
    }

    else {
        console.log("no operate case");
    }

    
    console.log("a: " + a);
    console.log("operator: " + operator);
    console.log("b: " + b);
    console.log("userInput: " + userInput);
    
    // reset userInput for next operation
    userInput = '';
}

equalsKey.addEventListener('click', (e) => {
    operate();
});
