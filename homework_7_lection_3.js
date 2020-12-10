// Саму функцию решил сделать на switch, так мне показалось короче и читабельнее. Можно и на if сделать если надо.
// Помимо функции сделал еще несколько для проверок, и ниже 2 варианта программы.

function doMath (x, znak, y) {
    switch (znak) {
        case '+':
            return x + y;
            break;
        case '-':
            return x - y;
            break;
        case '*':
            return x * y;
            break;
        case '/':
            return x / y;
            break;
        case '%':
            return x % y;
            break;
        case '^':
            return Math.pow(x,y);
            break;
        default:
            return alert('Wrong operation');
    }
}

// Функция проверки ввода пользователя. Нам для математических операций нужны только натуральные числа(включая ноль). Для варианта 1.

function checkPromptForNumbers0(userValue) {
    if (isNaN(userValue) || userValue === '' || /\s/.test(userValue) || userValue === null) {
        return false;
    }
    return true;
}

// Еще одна функция проверки ввода. Тут проверяем что ввели именно один из знаков, а не что-то другое. Для варианта 1

function checkMathSign(someSign) {
    switch (someSign) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '%':
        case '^':
            return true;
            break;
    }
    return false;
}

// Функция проверки введенной строки на определенный формат. Для вариант 2.

function checkExpressionFormat (someString) {
    if (/(\+|-)?\d+\s(\+|-|\*|\/|%|\^)\s(\+|-)?\d+/.test(someString)) {
        return true;
    }
    return false;
}

// Ну и 2 варианта программы, эти 3 переменные ниже - используются в обеих, надо просто закомментировать первую, и раскомментировать вторую, чтобы посмотреть как она работает

let firstOperand;
let secondOperand;
let mathSign;

// ******************** Вариант 1 ********************
// Сама программа. Запрашиваем оба числа и какую математическую операцияю с ними надо сделать
// При невалидный вводе невалидных значений запрашивает ввод снова
// При закрытии любого модального окна, инструкции, которые следуют далее, не выполняются, так как считаем что пользователь захотел выйти.
// Результат выводим в alert

do {
    firstOperand = prompt('Please enter first number', '');
    if (firstOperand === null) {
        break;
    }
} while (checkPromptForNumbers0(firstOperand) === false);

if (checkPromptForNumbers0(firstOperand) === true) {
    do {
        secondOperand = prompt('Please enter second number', '');
        if (secondOperand === null) {
            break;
        }
    } while (checkPromptForNumbers0(secondOperand) === false);
}

if (checkPromptForNumbers0(secondOperand) === true) {
    do {
        mathSign = prompt('What mathematical action needs to be performed? Enter only +,-,*,/,% or ^','');
        if (mathSign === null) {
            break;
        }
    } while (checkMathSign(mathSign) === false);
}

if (checkMathSign(mathSign) === true) {
    alert('Result of ' + firstOperand + ' ' + mathSign + ' ' + secondOperand + ' = ' + doMath(+firstOperand, mathSign, +secondOperand));
}

// ******************** Вариант 2 ********************
// Тут уже программа не запрашивает по отдельности каждое число и знак операции
// Тут просить ввести строку в определенном формате
// Есть функция проверки на формат с помощью регулярного выражения
// После чего раскладываем строку в массив, из которого уже берем необходимые значения в соответсвующих индексах и присваиваем переменным
// Выводим результат в alert
/*
let userString;

do {
    userString = prompt('Please enter expression in following format:','8 + 2');
    if (userString === null) {
        break;
    }
} while (checkExpressionFormat(userString) === false);

if (checkExpressionFormat(userString) === true) {
    firstOperand = userString.split(' ')[0];
    secondOperand = userString.split(' ')[2];
    mathSign = userString.split(' ')[1];
    alert('Result of ' + firstOperand + ' ' + mathSign + ' ' + secondOperand + ' = ' + doMath(+firstOperand, mathSign, +secondOperand));
}
*/