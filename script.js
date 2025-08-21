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

// Функция обновления дисплея с форматированием
function updateDisplay() {
    // Форматируем числа для отображения
    const formattedCurrent = formatNumber(currentOperand);
    const formattedPrevious = formatNumber(previousOperand);
    
    currentOperandElement.textContent = formattedCurrent;
    previousOperandElement.textContent = formattedPrevious;
}

// Функция форматирования чисел
function formatNumber(number) {
    if (number === '') return '';
    
    // Если число заканчивается на точку, не форматируем его
    if (number.endsWith('.')) {
        return number;
    }
    
    const num = parseFloat(number);
    if (isNaN(num)) return number;
    
    // Если число слишком большое, используем научную нотацию
    if (Math.abs(num) > 999999999999) {
        return num.toExponential(6);
    }
    
    // Ограничиваем количество знаков после запятой
    return parseFloat(num.toFixed(8)).toString();
}

// Функция добавления цифры
function appendNumber(number) {
    // Если уже есть точка и пытаемся добавить еще одну - игнорируем
    if (number === '.' && currentOperand.includes('.')) return;
    
    // Ограничиваем длину числа до 12 символов (но точка считается как символ)
    if (currentOperand.length >= 12) return;
    
    // Если текущее число 0 и добавляем точку - добавляем точку к 0
    if (currentOperand === '0' && number === '.') {
        currentOperand = '0.';
    }
    // Если текущее число 0 и добавляем не точку - заменяем 0
    else if (currentOperand === '0' && number !== '.') {
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

// Функция выполнения вычислений
function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    
    // Если нет чисел для вычисления - выходим
    if (isNaN(prev) || isNaN(current)) return;
    
    // Выполняем операцию в зависимости от выбранной
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '×':
            computation = prev * current;
            break;
        case '÷':
            // Проверяем деление на ноль
            if (current === 0) {
                alert('Деление на ноль невозможно!');
                return;
            }
            computation = prev / current;
            break;
        default:
            return;
    }
    
    // Обновляем текущее число результатом
    currentOperand = computation.toString();
    operation = undefined;
    previousOperand = '';
    
    updateDisplay();
}

// Добавляем обработчики событий для всех кнопок
document.addEventListener('DOMContentLoaded', function() {
    // Кнопка очистки
    document.querySelector('.clear').addEventListener('click', clear);
    
    // Кнопка смены знака
    document.querySelector('.sign').addEventListener('click', changeSign);
    
    // Кнопки с цифрами
    document.querySelectorAll('.number').forEach(button => {
        button.addEventListener('click', () => {
            appendNumber(button.textContent);
        });
    });
    
    // Кнопки операций
    document.querySelectorAll('.operator').forEach(button => {
        button.addEventListener('click', () => {
            chooseOperation(button.textContent);
        });
    });
    
    // Кнопка равно
    document.querySelector('.equals').addEventListener('click', compute);
});

// Инициализируем дисплей при загрузке
updateDisplay();
