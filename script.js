let firstNum = '';
let secondNum = '';
let operator;
const calcButton = document.querySelectorAll('.calcButton');
const display = document.querySelector('.display');
const equalButton = document.querySelector('.equal');

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
  return num1 / num2;
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
    else {
      operator = value;
    }
}

calcButton.forEach(button => {
  button.addEventListener('click', updateDisplay);
})

equalButton.addEventListener('click', () => {
  const result = operate(operator, firstNum, secondNum);
  display.textContent = result;
});