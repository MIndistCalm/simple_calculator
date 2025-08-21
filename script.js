// Получаем ссылки на элементы дисплея
const previousOperandElement = document.querySelector('.previous-operand');
const currentOperandElement = document.querySelector('.current-operand');

// Переменные для хранения данных
let currentOperand = '0';
let previousOperand = '';
let operation = undefined;

// Функция очистки калькулятора
function clear() {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
    updateDisplay();
}

// Функция обновления дисплея
function updateDisplay() {
    currentOperandElement.textContent = currentOperand;
    previousOperandElement.textContent = previousOperand;
}
