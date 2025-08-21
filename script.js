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

// Функция добавления цифры
function appendNumber(number) {
    // Если уже есть точка и пытаемся добавить еще одну - игнорируем
    if (number === '.' && currentOperand.includes('.')) return;
    
    // Если текущее число 0 и добавляем не точку - заменяем 0
    if (currentOperand === '0' && number !== '.') {
        currentOperand = number;
    } else {
        currentOperand += number;
    }
    
    updateDisplay();
}

// Функция смены знака числа
function changeSign() {
    if (currentOperand !== '0') {
        currentOperand = currentOperand.startsWith('-') 
            ? currentOperand.slice(1) 
            : '-' + currentOperand;
        updateDisplay();
    }
}

// Функция выбора операции
function chooseOperation(selectedOperation) {
    // Если нет текущего числа - выходим
    if (currentOperand === '') return;
    
    // Если есть предыдущее число - вычисляем результат
    if (previousOperand !== '') {
        compute();
    }
    
    // Сохраняем операцию и текущее число
    operation = selectedOperation;
    previousOperand = currentOperand + ' ' + getOperationSymbol(selectedOperation);
    currentOperand = '';
    
    updateDisplay();
}

// Функция получения символа операции для отображения
function getOperationSymbol(operation) {
    switch(operation) {
        case '+': return '+';
        case '-': return '-';
        case '×': return '×';
        case '÷': return '÷';
        default: return operation;
    }
}
