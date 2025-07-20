let firstNum = '';
let secondNum = '';
let operator;
let result;
const display = document.querySelector('.display');
const calcButton = document.querySelectorAll('.calcButton');
const equalButton = document.querySelector('.equal');
const clearButton = document.querySelector('.clear');
const deleteButton = document.querySelector('.delete');

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
    case 'x':
      return multiply(num1, num2);
      break;
    case '÷':
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

function deleteInput() {
  display.textContent = display.textContent.slice(0, -1);

  if (!operator) {
    firstNum = firstNum.slice(0, -1);
  }
  else if (operator && !secondNum) {
    operator = operator.slice(0, -1);
  }
  else {
    secondNum = secondNum.slice(0, -1);
  }
}

function updateDisplay(buttonValue) {
  //Check for multiple decimals in values
  if(buttonValue === '.') {
    if (firstNum.toString().includes('.') && !operator) return;
    if (operator && secondNum.toString().includes('.')) return;
  }

  display.textContent += buttonValue;
  assignValues(buttonValue);
}

function assignValues(value) {
  //Clear result if new number pressed
  if (result && (value !== '+' && value !== '-' && value !== 'x' && value !== '÷')) {
    clearDisplay();
    firstNum = value;
    display.textContent = value;
  }
  // Check for an operator and assign numbers
  else if(value !== '+' && value !== '-' && value !== 'x' && value !== '÷') {
    if (!operator) {
      firstNum += value
    }
    else {
      secondNum += value;
    }
  }
  //Check for first pair of numbers and evaluate
  else if (firstNum && operator && secondNum && (value === '+' || value === '-' || value === 'x' || value === '÷')) {
    firstNum = operate(operator, firstNum, secondNum);
    display.textContent = firstNum + value;
    operator = value;
    secondNum = '';
  }
  //Check for consecutive operators
  else if (firstNum && operator && (value === '+' || value === '-' || value === 'x' || value === '÷')) {
    operator = value;
    display.textContent = firstNum + value;
  }
  else {
    result = '';
    operator = value;
  }
}

calcButton.forEach(button => {
  button.addEventListener('click', () => {
    updateDisplay(button.textContent);
  });
});

clearButton.addEventListener('click', clearDisplay);

deleteButton.addEventListener('click', deleteInput);

equalButton.addEventListener('click', () => {
  //Check if equal button is pressed before values are assigned
  if (!firstNum || !operator || !secondNum) {
    return;
  }
  else {
    result = Math.round(operate(operator, firstNum, secondNum) * 10000) / 10000;
    display.textContent = result;
    firstNum = result;
    secondNum = '';
    operator = '';
  }
});

//Allow for keyboard support
document.addEventListener('keydown', (event) => {
  const acceptableValues = '.1234567890+-';

  //Check for appropriate values
  switch (event.key) {
    case 'Enter':
      if (!firstNum || !operator || !secondNum) {
      return;
    }
    else {
      result = Math.round(operate(operator, firstNum, secondNum) * 10000) / 10000;
      display.textContent = result;
      firstNum = result;
      secondNum = '';
      operator = '';
    }
      break;
    case 'Backspace':
      deleteInput();
      break;
    case '*':
      updateDisplay('x');
      break;
    case '/':
      updateDisplay('÷');
      break;
    default:
      if (!acceptableValues.includes(event.key)) {
        return;
      }
      else {
        updateDisplay(event.key);
        break;
      }
  }
});