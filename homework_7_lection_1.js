// Видимо я плохо понял ТЗ задачи 1. "Написать функцию заполнения двумерного массива. Имя произвольное."

// Возможно имелось ввиду создание двумерного массива, тогда пустой массив с указанным пользователем количеством строк и столбцов ниже

function createArray(rowCount, columnCount) {
    let arr = new Array(+rowCount);
    for(let i = 0; i < arr.length; i++) {
        arr[i] = new Array(+columnCount);
    }
    return arr;
}

// Если все же под "заполнить" имелось ввиду именно заполнить сразу, то тогда вот ниже заполняет элементы массива null. Вместо null уже можно менять в функции на то что нам надо

// function createArray(rowCount, columnCount) {
//     let arr = new Array(+rowCount);
//     for(let i = 0; i < arr.length; i++) {
//         arr[i] = new Array(+columnCount);
//         for (let j = 0; j <arr[i].length; j++) {
//             arr[i][j] = null;
//         }
//     }
//     return arr;
// }

// Ну или уже вариант когда пользователь и создает массив и сразу заполняет его значениями, то сделал еще одну функцию заполнения помимо функции создания:

function fillArray(someArray) {
    ifNull:
    for (let i = 0; i < someArray.length; i++) {
        for (let j = 0; j < someArray[i].length; j++) {
            value = prompt('Please enter the ' + (j + 1) + ' value of the ' + (i + 1) + ' row. ' + (someArray[i].length -j) + ' left' ,'')
            if (value === null) {
                break ifNull;
            }
            someArray[i][j] = value;
        }
    }
    return someArray;
}

// Функция проверки ввода пользователя. Нам для количества строк или  стольцов массива нужны только натуральные числа(кроме нуля).

function checkPromptForNumbers(userValue) {
    if (isNaN(userValue) || +userValue === 0) {
        return false;
    }
        return true;
}

// Это уже сама программа с применением функций
// Запрашиваем верные значения для создания массива
// При отмене модального окна, прекращаем работу программы
// Если значения введены верно, создаем массив с помощью функции createArray
// Вызываем функцию заполнения чтобы пользователь заполнил массив
// Результат выводим в консоль

let rows;
let columns;
let array;

do {
    rows = prompt('Please enter number of rows', '');
    if (rows === null) {
        break;
    }
} while(!checkPromptForNumbers(rows));

if (checkPromptForNumbers(rows)) {
    do {
        columns = prompt('Please enter number of columns', '');
        if (columns === null) {
            break;
        }
    } while(!checkPromptForNumbers(columns));
}

if (checkPromptForNumbers(columns)) {
    array = createArray(rows, columns);
    fillArray(array);
    console.log(array);
}