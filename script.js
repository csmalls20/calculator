let firstNum = '';
let secondNum = '';
let operator;
let result;
const display = document.querySelector('.display');
const calcButton = document.querySelectorAll('.calcButton');
const equalButton = document.querySelector('.equal');
const clearButton = document.querySelector('.clear');
const decimalButton = document.querySelector('.decimal');

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num2 === 0 ? 'Undefined' : num1 / num2;
}

function operate(operator, num1, num2) {
  num1 = Number(num1);
  num2 = Number(num2);

  switch(operator) {
    case '+':
      return add(num1, num2);
      break;
    case '-':
      return subtract(num1, num2);
      break;
    case '*':
      return multiply(num1, num2);
      break;
    case '/':
      return divide(num1, num2);
      break;
  }
}

function clearDisplay() {
  display.textContent = '';
  firstNum = '';
  secondNum = '';
  operator = '';
  result = '';
}

function updateDisplay(button) {
  let buttonValue = button.target.textContent;
  display.textContent += buttonValue;
  assignValues(buttonValue);
}

function assignValues(value) {
  //Clear result if new number pressed
  if (result && (value !== '+' && value !== '-' && value !== '*' && value !== '/')) {
    clearDisplay();
    firstNum = value;
    display.textContent = value;
  }
  // Check for an operator and assign numbers
  else if(value !== '+' && value !== '-' && value !== '*' && value !== '/') {
    if (!operator) {
      firstNum += value
    }
    else {
      secondNum += value;
    }
  }
  //Check for first pair of numbers and evaluate
  else if (firstNum && operator && secondNum && (value === '+' || value === '-' || value === '*' || value === '/')) {
    firstNum = operate(operator, firstNum, secondNum);
    display.textContent = firstNum + value;
    operator = value;
    secondNum = '';
  }
  //Check for consecutive operators
  else if (firstNum && operator && (value === '+' || value === '-' || value === '*' || value === '/')) {
    operator = value;
    display.textContent = firstNum + value;
  }
  else {
    result = '';
    operator = value;
  }
}

calcButton.forEach(button => {
  button.addEventListener('click', updateDisplay);
});

decimalButton.addEventListener('click', updateDisplay);

clearButton.addEventListener('click', clearDisplay);

equalButton.addEventListener('click', () => {
  //Check if equal button is pressed before values are assigned
  if (!firstNum || !operator || !secondNum) {
    return display.textContent;
  }
  else {
    result = Math.round(operate(operator, firstNum, secondNum) * 10000) / 10000;
    display.textContent = result;
    firstNum = result;
    secondNum = '';
    operator = '';
  }
});