// Сделал 2 варианта. Как по мне более оптимальный и универсальный первый. Второй мне не нравится, там много лишнего.
// Обе программы чувствительны к регистру. Тут сложно сказать на сколько это важно, в ТЗ об этом ничего нет, по этому оставил выбор за собой и оставил чувтсвтительность.

// ******************** Вариант 1 ********************
// removeAnySymbols принимает 2 аргумента, строку и массив. Сначала копируем исходную строку во временную
// Затем будет удалять каждый указанный символ используя метод split подставляя этот символ как разделитель
// Послче чего сразу же будем собирать полученный массив значений уже без удаленного символа с помощью метода join
// В методе join аргументом указываем пустую строку чтобы элементы массива не разделялись запятой
// Возвращаем измененный массив

function removeAnySymbols (someString, someSymbols) {
    let tempString = someString;
    for (let i = 0; i < someSymbols.length; i++) {
        tempString = tempString.split(someSymbols[i]).join('');
    }
    return tempString;
}

// collectSymbolsSplit собирает символы и строки из вводимых строк которые пользователь хочет удалить из исходной строки пока он не нажмет отмену
// Пустые строки не сохраняем в массив
// Возвращает массив с этим набором значений

function collectSymbolsSplit () {
    let userSymbols = [];
    let tempSymbols;

    for (let i = 0; tempSymbols !== null; i++) {
        tempSymbols = prompt('Please enter any symbols you want to remove from your string. Cancel to stop.','');
        if (tempSymbols !== null && tempSymbols !== '') {
            userSymbols[i] = tempSymbols;
        }
        if (tempSymbols === '') {
            i--;
        }

    }
    return userSymbols;
}

// collectSymbolsString, в отличии от collectSymbolsSplit собирает символы и строки из одной введенной строки
// Возвращает также массив с набором значений, можно использовать его вместо collectSymbolsSplit в самой программе

function collectSymbolsString () {
    let userSymbols = [];
    let tempSymbolStrings = prompt('Please enter any symbols you want to remove from your string in one string separated by comma.', 'ell,l,d');


    if (tempSymbolStrings !== null && tempSymbolStrings !== '') {
        userSymbols = tempSymbolStrings.split(',');
    }
    return userSymbols;
}

// Сама программа запрашивает любую строку, и если пользователь не нажал отмену выводит результат в косноль
// Для сравнения выводится и оригинальная строка ниже

let userString = prompt('Please type any string','Hello world work hell dell own');

if (userString !== null) {
    console.log(removeAnySymbols(userString, collectSymbolsSplit()));
}

console.log(userString);

// ******************** Вариант 2 ********************

// Тут уже более конкретно по ТЗ. То есть разложим строку на массив посимвольно и убирать будем только символы.
// Несколько символов подряд, слова или словосочетания и т.д. уже тут не получится убирать. Ну для этого и есть первый вариант.
// В первой реализации он сравнивает каждый символ массива полученного из строки с каждым символом из массива символов для удаления
// После уже делает из видоизмененного массива строку. Тут специально без методов сделал, так как они показаны в первом варианте.
// Во второй наоборот - каждый символ массива на удаление с каждым символом масиива полученного из строки
// По сути результат одинаковый
/*
function removeSymbolsVer_1 (someString, someSymbols) {
    let tempString = someString.split('');
    for (let i = 0; i < tempString.length; i++) {
        for (let j = 0; j < someSymbols.length; j++) {
            if (tempString[i] === someSymbols[j]) {
                tempString.splice(i, 1)
                i--;
            }
        }
    }
    let finalString = '';
    for (i = 0; i < tempString.length; i++){
        finalString = finalString.concat(tempString[i]);
    }
    return finalString;  
}

function removeSymbolsVer_2 (someString, someSymbols) {
    let tempString = someString.split('');
    for (let i = 0; i < someSymbols.length; i++) {
        for (let j = 0; j < tempString.length; j++) {
            if (tempString[j] === someSymbols[i]) {
                tempString.splice(j, 1)
                j--;
            }
        }
    }
    let finalString = '';
    for (i = 0; i < tempString.length; i++){
        finalString = finalString.concat(tempString[i]);
    }
    return finalString;
}

// collectOnlySymbolsSplit запрашивает у пользователя ввести только 1 символ
// В массив записываются только единичные символы, пустые строки или все чтоб более одного символа не записываются

function collectOnlySymbolsSplit () {
    let userSymbols = [];
    let tempSymbols;

    for (let i = 0; tempSymbols !== null ; i++) {
        tempSymbols = prompt('Please enter any symbol(only one will count) you want to remove from your string. Cancel to stop.','');
        if (tempSymbols !== null && tempSymbols.length === 1){
            userSymbols[i] = tempSymbols;
        }
        if (tempSymbols !== null && tempSymbols.length !== 1) {
            i--;
        }
    }
    return userSymbols;
}

// collectOnlySymbolsString запрашивает ввести строку с символами через запятую
// Методом split разобьем строку в массив
// Почистим массив чтобы остались только единичные символы, это можно проверить с помощью свойства length элемента массива так как это строка
// Чистка не совсем обязательна. removeSymbolsVer_1 и removeSymbolsVer_2 всеравно сработают верно, даже если у нас в массиве будут не только еденичные символы, просто на том этапе он не найдет совпадений

function collectOnlySymbolsString () {
    let userSymbols = [];
    let tempSymbolStrings = prompt('Please enter any symbol(only one will count) you want to remove from your string in one string separated by comma.', 'l,d');

    if (tempSymbolStrings !== null && tempSymbolStrings !== '') {
        userSymbols = tempSymbolStrings.split(',');
    }
    for (i = 0; i < userSymbols.length; i++) {
        if (userSymbols[i].length !== 1) {
            userSymbols.splice(i, 1);
            i--;
        }
    }
    console.log(userSymbols);
    return userSymbols;
}

// Ну и аналогичная первому варианту программа. функции можно менять, чтобы убедится что все работает.

let userString = prompt('Please type any string','Hello world work hell dell own');

if (userString !== null) {
    console.log(removeSymbolsVer_1(userString, collectOnlySymbolsSplit()));
}

console.log(userString);
*/