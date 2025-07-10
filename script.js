let firstNum = '';
let secondNum = '';
let operator;
let result;
const calcButton = document.querySelectorAll('.calcButton');
const display = document.querySelector('.display');
const equalButton = document.querySelector('.equal');
const clearButton = document.querySelector('.clear');

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
  if(value !== '+' && value !== '-' && value !== '*' && value !== '/') {
      if (!operator) {
        firstNum += value
      }
      else {
        secondNum += value;
      }
    }
  else if (firstNum && operator && secondNum && (value === '+' || value === '-' || value === '*' || value === '/')) {
    firstNum = operate(operator, firstNum, secondNum);
    display.textContent = firstNum + value;
    operator = value;
    secondNum = '';

  }
  else {
    operator = value;
  }
}

calcButton.forEach(button => {
  button.addEventListener('click', updateDisplay);
});

clearButton.addEventListener('click', clearDisplay);

equalButton.addEventListener('click', () => {
  if (!firstNum || !operator || !secondNum) {
    return display.textContent;
  }
  else {
    result = operate(operator, firstNum, secondNum);
    display.textContent = result;
    firstNum = result;
    secondNum = '';
    operator = '';
  }
});