const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextEl = document.querySelector('[data-previous-operand]');
const currentoperandTextEl = document.querySelector('[data-current-operand]');

class Calculator {
  constructor(previousOperandTextEl, currentOperandTextEl) {
    this.previousOperandTextEl = previousOperandTextEl;
    this.currentOperandTextEl = currentOperandTextEl;
    this.clear();
  }

  clear() {
    this.previousOperand = '';
    this.currentOperand = '';
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '/':
        computation = prev / current;
        break;
      case 'x':
        computation = prev * current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
  }

  updateDisplay() {
    this.currentOperandTextEl.innerText = this.currentOperand;
    if (this.operation) {
      this.previousOperandTextEl.innerText = `${this.previousOperand} ${this.operation}`;
    } else {
      this.previousOperandTextEl.innerText = '';
    }
  }
}

const calculator = new Calculator(previousOperandTextEl, currentoperandTextEl);

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
    button.classList.add('is-pressed');

    setTimeout(() => {
      button.classList.remove('is-pressed');
    }, 200);
  });
});

operationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
    button.classList.add('is-pressed');

    setTimeout(() => {
      button.classList.remove('is-pressed');
    }, 200);
  });
});

equalsButton.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
  equalsButton.classList.add('is-pressed');
  setTimeout(() => {
    equalsButton.classList.remove('is-pressed');
  }, 200);
});

allClearButton.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
  allClearButton.classList.add('is-pressed');
  setTimeout(() => {
    allClearButton.classList.remove('is-pressed');
  }, 200);
});

deleteButton.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
  deleteButton.classList.add('is-pressed');
  setTimeout(() => {
    deleteButton.classList.remove('is-pressed');
  }, 200);
});
