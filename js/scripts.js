const previousOperationText = document.querySelector('.previous-operation');
const currentOperationText = document.querySelector('.current-operation');
const buttons = document.querySelectorAll('.buttons-display button');

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentNumber = "";
        this.previousNumber = "";
        this.operator = null;
        this.digitLimit = 10;
    }

    addDigit(digit) {
        if (digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }
        if (this.currentNumber.length < this.digitLimit) {
            this.currentNumber += digit;
            this.updateCurrentDisplay();
        }
    }

    setOperator(operator) {
        if (this.currentNumber === "") {
            if (this.previousNumber !== "") {
                this.operator = operator;
                this.updatePreviousDisplay();
            }
            return;
        }
        if (this.previousNumber !== "") {
            this.operationProcessing();
        }
        this.operator = operator;
        this.previousNumber = this.currentNumber;
        this.currentNumber = "";
        this.updatePreviousDisplay();
        this.updateCurrentDisplay();
    }

    operationProcessing() {
        if (this.currentNumber === "" || this.previousNumber === "") return;
        let operationProcessing;
        const currentValue = +this.currentNumber;
        const previousValue = +this.previousNumber;

        switch (this.operator) {
            case "+":
                operationProcessing = previousValue + currentValue;
                break;
            case "-":
                operationProcessing = previousValue - currentValue;
                break;
            case "*":
                operationProcessing = previousValue * currentValue;
                break;
            case "/":
                operationProcessing = previousValue / currentValue;
                break;
        }

        this.currentNumber = operationProcessing;
        this.operator = null;
        this.previousNumber = "";
        this.updatePreviousDisplay();
        this.updateCurrentDisplay();

    }

    operationC() {
        this.currentNumber = "";
        this.previousNumber = "";
        this.operator = null;
        this.updatePreviousDisplay();
        this.updateCurrentDisplay();
    }

    operationCE() {
        this.currentNumber = "";
        this.updatePreviousDisplay();
        this.updateCurrentDisplay();
    }

    operationDEL() {
        this.currentNumber = this.currentNumber.slice(0, -1);
        this.updateCurrentDisplay();

    }

    updatePreviousDisplay() {
        let displayText = this.previousNumber + (this.operator ? ` ${this.operator}` : "");
        if (displayText.length > 15) {
            displayText = "ERROR";
        }
        this.previousOperationText.innerText = displayText;
    }

    updateCurrentDisplay() {
        this.currentOperationText.innerText = this.currentNumber;
    }
}

const calculator = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        const value = e.target.innerText;
        if (["+", "-", "*", "/"].includes(value)) {
            calculator.setOperator(value);
        } else if (value === "=") {
            calculator.operationProcessing();
        } else if (value === "C") {
            calculator.operationC();
        } else if (value === "CE") {
            calculator.operationCE();
        } else if (value === "DEL") {
            calculator.operationDEL();
        } else {
            calculator.addDigit(value);
        }
    });
});