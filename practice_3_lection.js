// 1. Вариант на if else на регулярных выражениях asd dasd 123

let year = prompt('Please enter your age','');                          // Просим ввести свой возраст

if (isNaN(year) || year === '' || /\s/.test(year)) {                    // Если введенные данные не число, пустая строка или строка содержит пробелы
    alert('Please enter only one number');                              // Выводим сообщение и просим ввести только одно число
} else if(/\d*1\b/.test(year) && !/11/.test(year)) {                    // Если в конце числа единица, и это не число одинадцать
    alert('Вам ' + year + ' год');                                      // Правильным словом будет слово "год" 
} else if (/\d*[2-4]\b/.test(year) && !/(12|13|14)\b/.test(year)) {     // Если в конце числа двойка, тройка или четверка, и это не числа двендацать, тринадцать и четырнадцать
    alert('Вам ' + year + ' года');                                     // Правильным словом будет слово "года"
} else if (year === null) {                                             // Есил пользователь закроет модальное окно
    alert('Canceled');                                                  // Выводим алерт об отмене, можно впринципе ничего не выводить.
} else {                                                                // Во всех остальных случаях правильным словом будет слово "лет"
    alert('Вам ' + year + ' лет');
}


// 2. Вариант с циклом который будет запрашивать ввести данные до ввода валидных или закрытия модального окна
/*
let year;

do {                                                                    // Тут все тоже самое только мы будем запускать цикл с постусловием

year = prompt('Please enter your age','');

    if (isNaN(year) || year === '' || /\s/.test(year)) {
    alert('Please enter only one number');
    } 

} while (isNaN(year) || year === '' || /\s/.test(year))                 // Если данные не валидны, а именно введено не число, пустая строка или стока содержит хотябы один пробел, то попросим ввести снова

if(/\d*1\b/.test(year) && !/11/.test(year)) {
    alert('Вам ' + year + ' год');
} else if (/\d*[2-4]\b/.test(year) && !/(12|13|14)\b/.test(year)) {
    alert('Вам ' + year + ' года');
} else if (year === null) {
    alert('Canceled');
} else {
    alert('Вам ' + year + ' лет');
}
*/               

// 3. Вариант на switch case. В лекции говорилось что так лучше не делать(не передавать в switch true), я не до конца понимаю почему.
/*
let year = prompt('Please enter your age','');

switch (true) {
    case isNaN(year) || year === '' || /\s/.test(year) :
        alert('Please enter only one number');
        break;
    case /\d*1\b/.test(year) && !/11/.test(year) :
        alert('Вам ' + year + ' год');
        break;
    case /\d*[2-4]\b/.test(year) && !/(12|13|14)\b/.test(year) :
        alert('Вам ' + year + ' года');
        break;
    case year === null :
        alert('Canceled');
        break;
    default:
        alert('Вам ' + year + ' лет');
}
*/

// 4. Тот же вариант свича обернутый в цикл.
/*
let year;

do {

year = prompt('Please enter your age','');

switch (true) {
    case isNaN(year) || year === '' || /\s/.test(year) :
        alert('Please enter only one number');
        break;
    case /\d*1\b/.test(year) && !/11/.test(year) :
        alert('Вам ' + year + ' год');
        break;
    case /\d*[2-4]\b/.test(year) && !/(12|13|14)\b/.test(year) :
        alert('Вам ' + year + ' года');
        break;
    case year === null :
        alert('Canceled');
        break;
    default:
        alert('Вам ' + year + ' лет');
}

} while (isNaN(year) || year === '' || /\s/.test(year))
*/

// 5. Вариант без регулярных выражений
/*
let year = prompt('Please enter your age','');

let year10 = Math.floor(year % 10);
let year100 = Math.floor(year % 100);

if (isNaN(year) || year === '' || !year.trim()) {
    alert('Please enter only one number');
} else if(year10 === 1 && year100 !== 11) {
    alert('Вам ' + +year + ' год');
} else if ((year10 === 2 || year10 === 3 || year10 === 4) && (year100 !== 12 && year100 !== 13 && year100 !==14)) {
    alert('Вам ' + +year + ' года');
} else if (year === null) {
    alert('Canceled');
} else {
    alert('Вам ' + +year + ' лет');
}
*/